import Hotels from '@/components/Hotels';
import InfoSection from '@/components/InfoSection';
import PlacesToVisit from '@/components/PlacesToVisit';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function ViewTrip() {

    const {tripId}=useParams();
    const[trip,setTrip]=useState([]);

    useEffect(()=>{
       tripId && GetTripData();
    },[tripId])

    const GetTripData=async()=>{
        const docRef=doc(db,"AITrips",tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists())
        {
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
            
        }
        else{
            console.log("No Such Document");
            toast("No trip Found!")
        }
    }

    console.log("hiii");
    console.log(trip)

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    {/*information section */}
        <InfoSection trip={trip} />

    {/*Recomonded Hotels */}
        <Hotels trip={trip}/>

    {/*Daily Plan */}
    <PlacesToVisit trip={trip} />



    </div>
  )
}

export default ViewTrip