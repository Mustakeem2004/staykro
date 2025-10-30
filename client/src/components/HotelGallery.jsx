// import React, { useState } from "react";
// import "./HotelGallery.css";

// const HotelGallery = ({ photos }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   if (!photos || photos.length === 0) return <p>No images available</p>;

//   const openModal = (index) => {
//     setCurrentIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const nextImage = () =>
//     setCurrentIndex((prev) => (prev + 1) % photos.length);

//   const prevImage = () =>
//     setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

//   return (
//     <div className="hotel-gallery">
//       {/* Initial preview */}
//       <div className="main-image-container">
//         <img
//           src={photos[0].url}
//           alt="Hotel"
//           className="main-image"
//           onClick={() => openModal(0)}
//         />
//       </div>

//       <div className="thumbnails">
//         {photos.slice(1, 7).map((photo, idx) => (
//           <img
//             key={idx}
//             src={photo.url}
//             alt={`Thumbnail ${idx + 1}`}
//             className="thumbnail"
//             onClick={() => openModal(idx + 1)}
//           />
//         ))}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="modal">
//           <button className="close-btn" onClick={closeModal}>
//             &times;
//           </button>
//           <button className="prev-btn" onClick={prevImage}>
//             &#10094;
//           </button>
//           <img src={photos[currentIndex].url} alt="Gallery" className="modal-image" />
//           <button className="next-btn" onClick={nextImage}>
//             &#10095;
//           </button>

//           <div className="modal-thumbnails">
//             {photos.map((photo, idx) => (
//               <img
//                 key={idx}
//                 src={photo.url}
//                 alt={`Modal thumb ${idx}`}
//                 className={`modal-thumb ${
//                   idx === currentIndex ? "active-thumb" : ""
//                 }`}
//                 onClick={() => setCurrentIndex(idx)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HotelGallery;





import React, { useState, useEffect } from "react";
import "./HotelGallery.css";

const HotelGallery = ({ photos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return <p>No images available</p>;

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  // Keyboard navigation (←, →, Esc)
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="hotel-gallery">
      {/* Main preview image */}
      <div className="main-image-container">
        <img
          src={photos[0].url}
          alt="Hotel"
          className="main-image"
          onClick={() => openModal(0)}
          loading="lazy"
        />
      </div>

      {/* Thumbnails preview */}
      <div className="thumbnails">
        {photos.slice(1, 7).map((photo, idx) => (
          <img
            key={idx}
            src={photo.url}
            alt={`Thumbnail ${idx + 1}`}
            className="thumbnail"
            onClick={() => openModal(idx + 1)}
            loading="lazy"
          />
        ))}
      </div>

      {/* Fullscreen modal view */}
      {isModalOpen && (
        <div className="modal">
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>

          <button className="nav-btn prev-btn" onClick={prevImage}>
            &#10094;
          </button>

          <img
            src={photos[currentIndex].url}
            alt="Gallery"
            className="modal-image"
            loading="lazy"
          />

          <button className="nav-btn next-btn" onClick={nextImage}>
            &#10095;
          </button>

          {/* Thumbnail strip inside modal */}
          <div className="modal-thumbnails">
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo.url}
                alt={`Modal thumb ${idx}`}
                className={`modal-thumb ${
                  idx === currentIndex ? "active-thumb" : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelGallery;

