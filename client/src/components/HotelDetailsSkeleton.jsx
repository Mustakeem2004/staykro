import React from 'react';
import './HotelDetails.css';

const HotelDetailsSkeleton = () => {
  return (
    <div className="hotel-details-container-skeleton">
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          .skeleton-box {
            background-color: #e0e0e0;
            border-radius: 8px;
          }
          .hotel-details-container-skeleton {
            animation: pulse 1.5s infinite ease-in-out;
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }
          .gallery-skeleton {
            display: flex;
            gap: 10px;
            height: 400px;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
          }
          .header-skeleton {
            display: flex;
            justify-content: space-between;
            gap: 1.5rem;
            padding-bottom: 20px;
          }
          @media (max-width: 768px) {
            .gallery-skeleton {
              height: 250px;
            }
            .header-skeleton {
              flex-direction: column;
              align-items: flex-start;
            }
            .hotel-price-skeleton {
              align-items: flex-start !important;
              width: 100%;
            }
          }
          @media (max-width: 480px) {
            .gallery-skeleton {
              height: 180px;
            }
          }
        `}
      </style>

      {/* Gallery Skeleton */}
      <div className="gallery-skeleton">
        <div className="skeleton-box" style={{ flex: 2, height: '100%' }}></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="skeleton-box" style={{ flex: 1 }}></div>
          <div className="skeleton-box" style={{ flex: 1 }}></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="hotel-details-content">
        
        {/* Header Section */}
        <div className="header-skeleton">
          <div className="hotel-info" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div className="skeleton-box" style={{ height: '38px', width: '80%' }}></div>
            <div className="skeleton-box" style={{ height: '18px', width: '60%' }}></div>
            <div className="skeleton-box" style={{ height: '24px', width: '60px' }}></div>
          </div>
          <div className="hotel-price-skeleton" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
            <div className="skeleton-box" style={{ height: '34px', width: '150px' }}></div>
            <div className="skeleton-box" style={{ height: '45px', width: '140px', borderRadius: '10px' }}></div>
          </div>
        </div>

        {/* About Section */}
        <div className="hotel-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
         <div className="skeleton-box" style={{ height: '30px', width: '30%' }}></div>
         <div className="skeleton-box" style={{ height: '18px', width: '100%' }}></div>
         <div className="skeleton-box" style={{ height: '18px', width: '100%' }}></div>
         <div className="skeleton-box" style={{ height: '18px', width: '80%' }}></div>
        </div>

        {/* Amenities Section */}
        <div className="hotel-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <div className="skeleton-box" style={{ height: '30px', width: '25%' }}></div>
          <div className="amenities">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-box" style={{ height: '40px', borderRadius: '10px' }}></div>
            ))}
          </div>
        </div>

        {/* Rooms / Policies Section Placeholder */}
        <div className="hotel-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <div className="skeleton-box" style={{ height: '30px', width: '40%' }}></div>
          <div className="skeleton-box" style={{ height: '150px', width: '100%' }}></div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetailsSkeleton;
