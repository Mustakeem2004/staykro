import React from 'react';

const HotelCardSkeleton = () => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "15px",
        display: "flex",
        gap: "13px",
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#fff",
        animation: "pulse 1.5s infinite ease-in-out"
      }}
    >
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
        `}
      </style>
      
      {/* Image Skeleton */}
      <div 
        className="skeleton-box" 
        style={{ 
          width: "200px", 
          height: "200px", 
          borderRadius: "10px",
          flexShrink: 0
        }}
      ></div>

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
