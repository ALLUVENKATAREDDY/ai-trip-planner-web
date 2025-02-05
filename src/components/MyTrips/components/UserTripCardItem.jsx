/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={"/view-trip/"+trip.id}>
    <div className='hover:scale-105 transition-all'>
        <img src="https://res.cloudinary.com/df67zy4wm/image/upload/v1729792396/g5yvu1zajm1s9v5v0vgp.avif " className='object-cover rounded-xl h-[220px]' />
        <div>
            <h2 className='font-bold text-lg'>{trip.userSelection.location}</h2>
            <h2 className='text-sm text-gray-800'>{trip.userSelection.days} Days trip with {trip.userSelection.budget} Budget </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem