import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

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
            <Link to={'/view-trip/' + (trip?.tripId || '')}>
              <div className='transition-all hover:scale-105'>
                <img 
                  src={photoUrl ? photoUrl : '/placeholder.jpg'} 
                  className="object-cover rounded-xl w-full h-64 " 
                  alt="Trip" 
                />
                <div>
                  <h2 className='text-black font-bold text-lg'>
                    {trip?.userSelection?.location?.label || 'Unknown Location'}
                  </h2>
                  <h2 className='text-sm text-gray-500'>
                    {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
                  </h2>
                </div>
              </div>
            </Link>
          );
}          
export default UserTripCardItem