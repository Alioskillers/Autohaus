import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCenter = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div style={backgroundBoxStyle}>
        <div style={heroContainerStyle}>
          <h1 style={titleStyle}>Welcome to Autohaus Service Center</h1>
        <button style={buttonStyle} onClick={() => navigate('/book-appointment')}>
          Book an Appointment
        </button>
        
        </div>
      </div>
      
      {/* Car Care Information Section */}
      <div style={infoSectionWrapperStyle}>
        <div style={containerStyle}>
          <div style={infoSectionStyle}>
            <h2 style={sectionTitleStyle}>Essential Car Care Tips</h2>
            
            <div style={cardsContainerStyle}>
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>Regular Maintenance</h3>
                <p style={cardTextStyle}>
                  Keep your vehicle running smoothly with routine oil changes, filter replacements, 
                  and scheduled inspections. Regular maintenance prevents costly repairs and extends 
                  your car's lifespan.
                </p>
              </div>
              
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>Tire Care</h3>
                <p style={cardTextStyle}>
                  Check tire pressure monthly and inspect tread depth regularly. Proper tire 
                  maintenance improves fuel efficiency, ensures safety, and provides better 
                  handling in all weather conditions.
                </p>
              </div>
              
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>Fluid Levels</h3>
                <p style={cardTextStyle}>
                  Monitor essential fluids including engine oil, coolant, brake fluid, and 
                  windshield washer fluid. Proper fluid levels keep your vehicle's systems 
                  operating efficiently and safely.
                </p>
              </div>
              
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>Battery Health</h3>
                <p style={cardTextStyle}>
                  Clean battery terminals and check connections regularly. Cold weather can 
                  affect battery performance, so have it tested annually to avoid unexpected 
                  breakdowns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const backgroundBoxStyle = {
  margin: '0',
  padding: '0',
  width: '100vw',
  height: 'calc(100vh - 80px)',
  minHeight: '500px',
  backgroundImage: "url('/Service.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'scroll',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '40px',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '80px',
  left: '0'
};

const heroContainerStyle = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Helvetica Neue, sans-serif',
  width: '100%',
  maxWidth: '1200px',
  boxSizing: 'border-box',
};

const infoSectionWrapperStyle = {
  marginTop: 'calc(100vh)',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  paddingTop: '4rem',
  paddingBottom: '4rem'
};

const containerStyle = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Helvetica Neue, sans-serif',
  width: '100%',
  maxWidth: '1200px',
  boxSizing: 'border-box',
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '1.5rem',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  textAlign: 'center'
};

const buttonStyle = {
  marginTop: '1rem',
  padding: '0.8rem 2rem',
  fontSize: '1rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const infoSectionStyle = {
  marginTop: '4rem',
  width: '100%',
  maxWidth: '1200px',
};

const sectionTitleStyle = {
  fontSize: '2rem',
  color: '#333',
  textAlign: 'center',
  marginBottom: '2rem',
  fontWeight: 'bold'
};

const cardsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  marginBottom: '3rem'
};

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  padding: '1.5rem',
  color: '#333',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
};

const cardTitleStyle = {
  fontSize: '1.25rem',
  marginBottom: '0.75rem',
  color: '#2c3e50',
  fontWeight: 'bold'
};

const cardTextStyle = {
  fontSize: '0.95rem',
  lineHeight: '1.6',
  color: '#555'
};

const ctaContainerStyle = {
  textAlign: 'center',
  backgroundColor: '#2c3e50',
  padding: '2rem',
  borderRadius: '12px',
  color: '#fff'
};

const ctaTextStyle = {
  fontSize: '1.1rem',
  color: '#fff',
  marginBottom: '1.5rem'
};

const secondaryButtonStyle = {
  padding: '0.8rem 2rem',
  fontSize: '1rem',
  backgroundColor: '#fff',
  color: '#2c3e50',
  border: '2px solid #fff',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: 'bold'
};

export default ServiceCenter;