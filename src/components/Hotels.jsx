/* eslint-disable react/jsx-key */
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Hotels({ trip }) {
    // eslint-disable-next-line react/prop-types
    if (!trip || !trip.userSelection) {
        return <div>Loading...</div>; // Fallback content while data is loading
    }
    console.log("!!!!!!!!!!")
    console.log(trip);

    return (
        <div>
            <h2 className='font-bold text-xl mt-5 mb-3'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    
                    // eslint-disable-next-line react/prop-types
                    trip.tripData.hotels.map((hotel, index) => (
                        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel.hotelAddress} target='_blank' >
                        <div className='hover:scale-105 transition-all cursor-pointer' key={index}>
                            <img
                                src="https://res.cloudinary.com/df67zy4wm/image/upload/v1729792355/r0gsjwa6vtjevn1dfxhp.jpg"
                                className='rounded-xl'
                            />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍{hotel.hotelAddress}</h2>
                                <h2 className='text-sm'>💰 {hotel.price}</h2>
                                <h2 className='text-sm'>⭐ {hotel.rating}</h2>
                            </div>
                        </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Hotels