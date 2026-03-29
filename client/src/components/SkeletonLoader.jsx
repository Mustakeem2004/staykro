import React from 'react';

const SkeletonLoader = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '40px',
      boxSizing: 'border-box',
      animation: 'pulse 1.5s infinite ease-in-out'
    }}>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          .skeleton-bar {
            background-color: #e0e0e0;
            border-radius: 8px;
            width: 100%;
          }
        `}
      </style>
      <div className="skeleton-bar" style={{ height: '60px' }}></div>
      <div className="skeleton-bar" style={{ height: '300px' }}></div>
      <div className="skeleton-bar" style={{ height: '60px', width: '60%' }}></div>
      <div className="skeleton-bar" style={{ height: '60px', width: '80%' }}></div>
    </div>
  );
};

export default SkeletonLoader;
