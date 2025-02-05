/* eslint-disable react/prop-types */
import { IoIosSend } from "react-icons/io";
import { Button } from './ui/button';

// eslint-disable-next-line react/prop-types
function InfoSection({ trip }) {
    

    // eslint-disable-next-line react/prop-types
    if (!trip || !trip.userSelection) {
        return <div>Loading...</div>; // Fallback content while data is loading
    }

    return (
        <div>
            <img src="https://res.cloudinary.com/df67zy4wm/image/upload/v1729792396/g5yvu1zajm1s9v5v0vgp.avif " 
            className="h-[340px] w-full object-cover rounded "
                alt="Trip cover"
            />
            <div className='flex justify-between items-center'>
                    <div className='my-5 flex flex-col gap-2'>
                        <h2 className='font-bold text-2xl mb-2'>{trip.userSelection.location}</h2>
                        <div className='flex gap-5'>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md'>📅 {trip.userSelection.days} Days</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md'>💸 {trip.userSelection.budget} budget</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md'>🍾 No. Of Traveller:{trip.userSelection.traveller}</h2>
                        </div>
                    </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    );
}

export default InfoSection;
