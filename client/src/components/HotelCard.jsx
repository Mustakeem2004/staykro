// import React, { forwardRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import starRating from "../assets/star.png";
// import "./HotelCard.css";

// const HotelCard = forwardRef(({ hotel }, ref) => {
//   const navigate = useNavigate();

//   if (!hotel) return null;

//   // ✅ Use backend image as main image
//   const [imgSrc, setImgSrc] = useState(
//     hotel.image || "https://via.placeholder.com/400x250?text=No+Image"
//   );

//   // ✅ Fallback if image fails
//   const handleError = () => {
//     setImgSrc("https://via.placeholder.com/400x250?text=No+Image");
//   };

//   return (
//     <div
//       ref={ref}
//       className="hotelCard"
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         marginBottom: "20px",
//         padding: "15px",
//         display: "flex",
//         gap: "13px",
//       }}
//     >
//       {/* Hotel Image */}
//       <img
//         src={imgSrc}
//         alt={hotel.hotelName || "Hotel"}
//         className="cardImage"
//         onError={handleError}
//         style={{
//           width: "250px",
//           maxHeight: "300px",
//           borderRadius: "10px",
//           objectFit: "cover",
//         }}
//       />

//       {/* Hotel Details */}
//       <div className="cardData" style={{ width: "400px" }}>
//         <h2 style={{ padding: 0, margin: 0 }}>
//           {hotel.hotelName || "Unnamed Hotel"}
//         </h2>

//         <p style={{ padding: 0, margin: 0 }}>
//           {hotel.address || "No address available"}
//         </p>

//         <p>
//           <strong>
//             ₹{hotel.pricePerNight || hotel.price || Math.floor(Math.random() * 4000 + 1500)}
//           </strong>{" "}
//           / night
//         </p>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           {/* See availability button remains unchanged */}
//           <button
//             onClick={() =>
//               navigate(
//                 `/hotels/${hotel.city?.toLowerCase() || "city"}/${hotel._id || hotel.id}`
//               )
//             }
//             className="buttonSeeAvailability"
//             style={{
//               backgroundColor: "#0071c2",
//               color: "white",
//               border: "none",
//               padding: "10px",
//               height: "35px",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             See availability
//           </button>

//           {/* Rating */}
//           <div
//             style={{
//               backgroundColor: "green",
//               padding: "0px 5px",
//               borderRadius: "5px",
//               color: "white",
//               display: "flex",
//               alignItems: "center",
//               gap: "2px",
//             }}
//           >
//             <p style={{ margin: 0, fontSize: "12px", padding: "5px 2px" }}>
//               {hotel.rating || "N/A"}
//             </p>
//             <img
//               style={{ height: "10px", filter: "invert(1)" }}
//               src={starRating}
//               alt="star"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default HotelCard;



import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import starRating from "../assets/star.png";
import "./HotelCard.css";
import API_BASE_URL from "../config/api";

const HotelCard = forwardRef(({ hotel }, ref) => {
  const navigate = useNavigate();

  if (!hotel) return null;

  // ✅ Use backend image as main image
  const [imgSrc, setImgSrc] = useState(
    hotel.image || hotel.thumbnail || "https://via.placeholder.com/400x250?text=No+Image"
  );

  // ✅ Fallback if image fails
  const handleError = () => {
    setImgSrc("https://via.placeholder.com/400x250?text=No+Image");
  };
  
  

  return (
    <div
      ref={ref}
      className="hotelCard"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "15px",
        display: "flex",
        gap: "13px",
      }}
    >
      {/* Hotel Image */}
      <img
        src={imgSrc}
        alt={hotel.hotelName ||  "Hotel"}
        className="cardImage"
        onError={handleError}
        style={{
          width: "250px",
          maxHeight: "200px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />

      {/* Hotel Details */}
      <div className="cardData" style={{ width: "400px" }}>
        <h2 style={{ padding: 0, margin: 0 }}>
          {hotel.hotelName || hotel.name || "Unnamed Hotel"}
        </h2>

        <p style={{ padding: 0, margin: 0 }}>
          {hotel.address || "No address available"}
        </p>

        <p>
          <strong>
            ₹{hotel.basePricePerNight || hotel.price || hotel.pricePerNight}
          </strong>{" "}
          / night
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* See availability button remains unchanged */}
          <button
            onClick={() =>
              navigate(
                `/hotels/${hotel.city?.toLowerCase() || "city"}/${hotel._id || hotel.id}`
              )
            }
            className="buttonSeeAvailability"
            style={{
              backgroundColor: "#0071c2",
              color: "white",
              border: "none",
              padding: "10px",
              height: "35px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            See Details
          </button>

          {/* Rating */}
          <div
            style={{
              backgroundColor: "green",
              padding: "0px 5px",
              borderRadius: "5px",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <p style={{ margin: 0, fontSize: "12px", padding: "5px 2px" }}>
              {hotel.rating || hotel.starRating || "N/A"}
            </p>
            <img
              style={{ height: "10px", filter: "invert(1)" }}
              src={starRating}
              alt="star"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HotelCard;

