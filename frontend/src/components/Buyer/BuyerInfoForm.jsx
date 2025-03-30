import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default marker icon fix (Leaflet issue in React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const BuyerInfoForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Geolocation blocked or denied:', error);
      }
    );
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, location }); // Pass all info to parent
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Buyer Information</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required style={input} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required style={input} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={input} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={input} />
        <input name="address" placeholder="Address (optional)" onChange={handleChange} style={input} />
        <button type="submit" style={button}>Submit</button>
      </form>

      {location && (
        <div style={{ marginTop: '2rem', height: '300px' }}>
          <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>Your current location</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

const input = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const button = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: 'none',
  cursor: 'pointer'
};

export default BuyerInfoForm;