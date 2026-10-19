// import { db } from '@/service/firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { toast } from 'sonner';
// import InfoSection from './components/InfoSection';
// import Hotels from './components/Hotels';

// function ViewTrip() {

//     const {tripId}=useParams();
//     const [trip,setTrip]=useState([]);
//     useEffect(()=>{
//         tripId&&GetTripData();
//     },[tripId])

//     // Used to get the trip data from firebase

//     const GetTripData=async()=>{
//         const docRef=doc(db,'AITrips',tripId);
//         const docSnap=await getDoc(docRef);

//         if(docSnap.exists()){
//             console.log("Document:",docSnap.data());
//             setTrip(docSnap.data());
//         }

//         else{
//             console.log("No such document!");
//             toast ('No trip Found!')
//         }

//     }
//   return (
//     <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
//         {/* Information Section */}
//             <InfoSection trip={trip}/>
//         {/* Recommedation Hotels */}
//             <Hotels trip={trip}/>
//         {/* Daily Plans */}

//         {/* Footer */}
//     </div>
//   )
// }

// export default ViewTrip


import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Default to null instead of an array

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  // Function to get trip data from Firebase
  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data()); // Set the trip data from Firestore
    } else {
      console.log("No such document!");
      toast('No trip Found!');
    }
  };

  return (
    <div className="p-5 md:p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommedation Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plans */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
}

export default ViewTrip;
