/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types, no-unused-vars
function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-3 flex gap-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src="https://res.cloudinary.com/df67zy4wm/image/upload/v1729792375/duht1g9behvd1bg1c5um.avif" className='w-[130px] h-[130px] rounded-xl'/>
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-1000'>{place.placeDetails}</p>
        <h2 className='mt-2'>🕖 {place.timeToTravel}</h2>
       {/*  <Button size="sm"><FaMapLocationDot /></Button> */}
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem