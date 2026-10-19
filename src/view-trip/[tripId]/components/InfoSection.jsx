// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { IoIosSend } from "react-icons/io";

// const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=API_KEY&PARAMETERS=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;


// function InfoSection({trip}) {
//   const [photoUrl,setPhotoUrl]=useState();
//   useEffect(()=>{
//     trip&&GetPlacePhoto();
//   },[trip])

//   const GetPlacePhoto=async()=>{
//     const data={
//       textQuery:trip?.userSelection?.location?.label
//     }
//     const result=await GetPlaceDetails(data).then (resp=>{
//       console.log(resp.data.places[0].photos[3].name);

//       const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
//       setPhotoUrl(PhotoUrl)
//     })
//   }
//   return (
//     <div>
//         <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'/>
        
//         <div className='flex justify-between items-center'>
//         <div className='my-5 flex flex-col gap-2'>
//             <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>

            
//             <div className='flex gap-5'>
//                 <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️ {trip?.userSelection?.noOfDays} Day</h2>
//                 <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
//                 <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Traveler: {trip?.userSelection?.travelers} </h2>
//             </div>
//             </div>
//             <Button><IoIosSend />
//             </Button>
//         </div>
    
//     </div>
//   )
// }

// export default InfoSection


import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

// const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const result = await GetPlaceDetails(data);
      const photos = result.data.places[0]?.photos;

      if (photos && photos.length > 3) {
        const photoName = photos[3].name;
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        console.log(`Image URL: ${PhotoUrl?photoUrl:'/placeholder.jpg'}`); // This will be clickable in the console
        setPhotoUrl(PhotoUrl);
      } else {
        console.error("No sufficient photos found for this place.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div>
      {photoUrl && (
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt="Place" />
      )}
      
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>

          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️ {trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Traveler: {trip?.userSelection?.travelers}</h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;