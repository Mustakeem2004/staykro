import React from 'react'
import Hero from '../Hero'
// import { hotels } from './Hotels'
import TrendingDestinationList from '../TrendingDestinationList'
import './Home.css'

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendingDestinationList></TrendingDestinationList>
      
    </div>
  )
}

export default Home
