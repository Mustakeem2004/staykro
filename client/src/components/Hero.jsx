import './Hero.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {cities} from './UkCities.js'
import SearchBar from './SearchBar.jsx';
import API_BASE_URL from "../config/api";

function Hero() {
  
  return (
    <>
      <div className="hero_container bg_image">
        
        {/* Heading */}
         <div className="Quote_container">
          <h1>Wake Up to the Hills of Uttarakhand</h1>
          <p>Find your perfect stay and explore like never before.</p>
        </div>
        <SearchBar></SearchBar>

      </div>
    </>
  );
}

export default Hero;
