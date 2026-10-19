import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCarditems({ hotel }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    try {
      const result = await GetPlaceDetails(data);
      const photos = result.data.places[0]?.photos;

      if (photos && photos.length > 3) {
        const photoName = photos[3].name;
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        console.error("No sufficient photos found for this hotel.");
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    }
  };

  return (
    <Link
      to={`http://google.com/maps/place/${encodeURIComponent(`${hotel?.hotelName}, ${hotel?.hotelAddress}`)}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl} className="rounded-xl h-[180px] w-full object-cover" alt={hotel?.hotelName || "Hotel"} />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="text-black font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-black text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-black text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCarditems;
