import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axiosConfig';

const DowntimeGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkDowntime = async () => {
      try {
        const { data } = await axios.get('/downtime/current');
        const userRes = await axios.get('/auth/me').catch(() => null);
        const role = userRes?.data?.role || null;

        if (data.active && role !== 'Global-Admin' && location.pathname !== '/downtime') {
          navigate('/downtime', { state: { endTime: data.endsAt } });
        } else if (!data.active && location.pathname === '/downtime') {
          navigate('/');
        }
      } catch (err) {
        console.error('Downtime check failed:', err);
      } finally {
        setChecking(false);
      }
    };

    checkDowntime();

    const interval = setInterval(checkDowntime, 30000);
    return () => clearInterval(interval);
  }, [navigate, location]);

  // Effect to validate role only on /downtime route
  useEffect(() => {
    const validateAccess = async () => {
      try {
        const res = await axios.get('/auth/me');
        if (location.pathname === '/downtime' && res.data.role !== 'Global-Admin') {
          // Allow unauthenticated users to stay on /downtime, only redirect if logged in and not Global-Admin
          navigate('/forbidden');
        }
      } catch (err) {
        // Only redirect if the user is logged in but not allowed; skip redirection for logged-out users
        if (location.pathname === '/downtime') {
          console.log("Unauthenticated visitor on /downtime — allowing access.");
        }
      }
    };

    if (location.pathname === '/downtime') {
      validateAccess();
    }
  }, [navigate, location]);

  // Effect to disable navbar buttons except "Admin Access"
  useEffect(() => {
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(btn => {
      if (!btn.textContent.toLowerCase().includes('admin access')) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
      }
    });
  }, []);

  if (checking) return null;

  return <>{children}</>;
};

export default DowntimeGuard;