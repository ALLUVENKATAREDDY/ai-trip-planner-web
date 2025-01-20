/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {

    if (!trip || !trip.tripData || !Array.isArray(trip.tripData.itinerary)) {
        return <div>Loading...</div>; // Fallback content while data is loading or itinerary is not an array
    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-lg'>Places to Visit</h2>
            <div>
                {
                    trip.tripData.itinerary.map((item, index) => (
                        <div key={index}>
                            <h2 className='font-medium text-lg'>Day {item.day}</h2>
                            <div className='grid md:grid-cols-2 gap-5'>
                            {
                                Array.isArray(item.plan) ? (
                                    item.plan.map((place, index) => (
                                        <div key={index} className='my-3'>
                                           <PlaceCardItem place={place}/>
                                        </div>
                                    ))
                                ) : (
                                    <div>No places planned for this day</div> // Fallback in case plan is not an array
                                )
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlacesToVisit
