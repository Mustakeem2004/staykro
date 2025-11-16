import React, { useState } from "react";
import "./RoomImageModal.css";

const RoomImageModal = ({ images, roomType, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="room-modal-overlay" onClick={onClose}>
        <div className="room-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="room-modal-close" onClick={onClose}>✕</button>
          <p className="room-modal-no-images">No images available for this room</p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="room-modal-overlay" onClick={onClose}>
      <div className="room-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="room-modal-close" onClick={onClose}>✕</button>

        <h2 className="room-modal-title">{roomType} - Room Images</h2>

        <div className="room-modal-main-image">
          <img
            src={images[currentIndex]}
            alt={`${roomType} - Image ${currentIndex + 1}`}
          />
        </div>

        <div className="room-modal-counter">
          {currentIndex + 1} / {images.length}
        </div>

        <div className="room-modal-nav">
          <button
            className="room-modal-nav-btn room-modal-prev-btn"
            onClick={handlePrev}
            disabled={images.length === 1}
          >
            ← Previous
          </button>
          <button
            className="room-modal-nav-btn room-modal-next-btn"
            onClick={handleNext}
            disabled={images.length === 1}
          >
            Next →
          </button>
        </div>

        {images.length > 1 && (
          <div className="room-modal-thumbnails">
            {images.map((img, index) => (
              <div
                key={index}
                className={`room-modal-thumbnail ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomImageModal;
