import React from 'react';

const HotelCardSkeleton = () => {
  return (
    <div className="hotel-card-skeleton">
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          .skeleton-box {
            background-color: #e0e0e0;
            border-radius: 5px;
          }
          .hotel-card-skeleton {
            border: 1px solid #ddd;
            border-radius: 10px;
            margin-bottom: 20px;
            padding: 15px;
            display: flex;
            gap: 13px;
            width: 100%;
            max-width: 800px;
            background-color: #fff;
            animation: pulse 1.5s infinite ease-in-out;
          }
          .skeleton-image {
            width: 200px;
            height: 200px;
            border-radius: 10px;
            flex-shrink: 0;
          }
          @media (max-width: 768px) {
            .hotel-card-skeleton {
              flex-direction: column;
              padding: 10px;
            }
            .skeleton-image {
              width: 100%;
              height: 180px;
            }
          }
        `}
      </style>
      
      {/* Image Skeleton */}
      <div className="skeleton-box skeleton-image"></div>

      {/* Details Skeleton */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px", justifyContent: "center" }}>
        
        {/* Title */}
        <div className="skeleton-box" style={{ height: "28px", width: "70%" }}></div>

        {/* Address */}
        <div className="skeleton-box" style={{ height: "16px", width: "90%" }}></div>

        {/* Price */}
        <div className="skeleton-box" style={{ height: "20px", width: "40%", marginTop: "10px" }}></div>

        {/* Bottom row: Button & Rating */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
          {/* Button */}
          <div className="skeleton-box" style={{ height: "35px", width: "120px" }}></div>
          
          {/* Rating */}
          <div className="skeleton-box" style={{ height: "24px", width: "50px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
