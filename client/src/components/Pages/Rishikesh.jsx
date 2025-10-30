import React from 'react'
import HotelList from '../HotelList';

const Rishikesh = () => {
    const hotels = [
        { id: 1, name: "Ganga View Retreat", city: "Rishikesh", distance: 1.2, price: 2200, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 2, name: "Divine Resort", city: "Rishikesh", distance: 2.5, price: 3500, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Resort" },
        { id: 3, name: "Himalayan Hideaway", city: "Rishikesh", distance: 4.1, price: 2800, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Villa" },
        { id: 4, name: "Riverfront Hotel", city: "Rishikesh", distance: 0.9, price: 2400, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 5, name: "Yoga Bliss Retreat", city: "Rishikesh", distance: 3.7, price: 3100, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Resort" },
        { id: 6, name: "Peaceful Stay Inn", city: "Rishikesh", distance: 2.0, price: 1900, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 7, name: "The Riverside Camp", city: "Rishikesh", distance: 6.5, price: 2700, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Resort" },
        { id: 8, name: "Spiritual Stay", city: "Rishikesh", distance: 1.8, price: 2600, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 9, name: "Hill View Residency", city: "Rishikesh", distance: 5.2, price: 2300, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Villa" },
        { id: 10, name: "Lotus Grand", city: "Rishikesh", distance: 3.3, price: 3000, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
      ];
      const tagline="Rishikesh";
      
      return (
        <div >
        
            <HotelList key={hotels.id} hotels={hotels} tagline={tagline}></HotelList>
          
        </div>
      )
    }

export default Rishikesh
