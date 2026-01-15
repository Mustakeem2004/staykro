import React from 'react'
import TrendingDestinationCard from './TrendingDestinationCard'
import './TrendingDestinationList.css'
import API_BASE_URL from "../config/api";


const TrendingDestinationList = () => {
    const data=[
        {
            id:1,
        city:"Nainital",
        img:'https://www.mapsofindia.com/ci-moi-images/my-india/nainital.jpg',
        },
        {    id:2,
            city:"Rishikesh",
            img:'https://s7ap1.scene7.com/is/image/incredibleindia/1-triveni-ghat-rishikesh-uttarakhand-2-city-hero?qlt=82&ts=1726646286991',
            },
            {
                 id:3,
                city:"Dehradun",
                img:'https://media2.thrillophilia.com/images/photos/000/145/796/original/1550473639_1548768536_shutterstock_1136356946.jpg.jpg?w=753&h=450&dpr=1.5',
                },
                {
                id:4,
                city:"Bhimtal",
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanCI1LV3Hcdi3yLudaskwKZ1Fzi4G6-rmvQ&s',
                },
                {    id:5,
                    city:"Mussorie",
                    img:'https://c.ndtvimg.com/gws/ms/top-places-to-visit-in-mussoorie/assets/2.jpeg?1727874795',
                    },
                    {
                         id:6,
                        city:"Jim Corbett",
                        img:'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/76/47/f3/mountain-blue-sky-nature.jpg?w=1400&h=1400&s=1',
                        }
    
    ]
    
  return (
    <div>
        <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , margin:'30px'}} className='TrendingCardHeading'>
            <h1 style={{margin:'0px'}}>Trending Destinations</h1>
            <p>Most popular choices for travellers from India</p>

        </div>
        <div className='TrendingListImg' style={{}}>

        {data.map((item) => (<TrendingDestinationCard key={item.id} data={item}></TrendingDestinationCard>))}
        </div>
      
    </div>
  )
}

export default TrendingDestinationList
