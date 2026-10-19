import { db } from '@/service/firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Navigation } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate=useNavigate();
    const [useTrips,setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])


    /**
     * Used to Get All User Trips
     * @returns 
     */
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            Navigation('/');
            return;
        }
        
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips((prev) => [...prev, { ...doc.data(), tripId: doc.id }]);

});
    }
    return (
        <div className="sm:px-10 md:px-31 lg:px-56 xl:px-72 px-5 mt-10">
          <h2 className="font-bold text-3xl">My Trips</h2>
      
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
            {useTrips.length > 0 ? (
              useTrips.map((trip) => (
                <UserTripCardItem key={trip?.tripId || trip?.id} trip={trip} />
              ))
            ) : (
              Array(6).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-xl h-48 animate-[pulse_2s_ease-in-out_infinite]"
                />
              ))
            )}
          </div>
        </div>
      );
}      
export default MyTrips