import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import './TrendingDestinationCard.css'

const TrendingDestinationCard = ({ data }) => {
  const {setCity}=useContext(SearchContext);
  return (
    <div>
      <Link 
        to={`/hotels/${data.city.toLowerCase()}`} 
        className='TrendingCardContainer'
        style={{ textDecoration: 'none' }}
        onClick={()=>setCity(data.city)}
      >
        <div
          className="cardsmall"
          style={{
            backgroundImage: `url(${data.img})`,
          }}
        >
          <h2>{data.city}</h2>
          
        </div>
      </Link>
    </div>
  )
}

export default TrendingDestinationCard
