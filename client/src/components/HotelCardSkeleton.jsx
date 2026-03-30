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
            border-radius: 12px;
            margin-bottom: 20px;
            padding: 15px;
            display: flex;
            gap: 20px;
            width: 100%;
            background-color: #fff;
            animation: pulse 1s infinite ease-in-out;
            box-sizing: border-box;
            overflow: hidden;
          }
          .skeleton-image {
            width: 250px;
            height: 200px;
            border-radius: 10px;
            flex-shrink: 0;
          }

          @media (max-width: 768px) {
            .hotel-card-skeleton {
              gap: 12px;
              padding: 10px;
            }
            .skeleton-image {
              width: 150px;
              height: 120px;
            }
          }

          @media (max-width: 480px) {
            .hotel-card-skeleton {
              gap: 8px;
              padding: 8px;
            }
            .skeleton-image {
              width: 80px;
              height: 80px;
            }
          }
        `}
      </style>
      
      {/* Image Skeleton */}
      <div className="skeleton-box skeleton-image"></div>

      {/* Details Skeleton */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
        
        {/* Title */}
        <div className="skeleton-box" style={{ height: "24px", width: "70%" }}></div>

        {/* Address */}
        <div className="skeleton-box" style={{ height: "14px", width: "90%" }}></div>

        {/* Footer info: Price & Rating */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "auto" }}>
          {/* Price */}
          <div className="skeleton-box" style={{ height: "18px", width: "35%" }}></div>
          {/* Rating */}
          <div className="skeleton-box" style={{ height: "20px", width: "40px" }}></div>
        </div>

        {/* Button */}
        <div className="skeleton-box" style={{ height: "30px", width: "100px", marginTop: "5px" }}></div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
