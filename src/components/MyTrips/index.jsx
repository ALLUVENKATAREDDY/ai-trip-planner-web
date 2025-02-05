import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function Index() {
  // eslint-disable-next-line no-unused-vars
  const[userTrips,setUserTrips]=useState([])
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/'); 
      return;
    }
      setUserTrips([]);
      const tripsCollection = collection(db, "AITrips");
      const q = query(tripsCollection, where('userEmail', '==', user.email));

      // Fetch documents based on the query
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserTrips(prevVal=>[...prevVal,doc.data()])
        console.log(doc.id, " => ", doc.data());
      });
   
  };

  return <div className='sm:px-10 md:px-32 lg:px-56 lx:px-10 px-5 mt-10'>
    <h2 className='font-bold text-3xl'>My Trips</h2>

    <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10' >
      {userTrips.length>0?
        userTrips.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index} className="object-cover rounded-xl"/>
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
        ))
      }
    </div>
  </div>;
}

export default Index;
