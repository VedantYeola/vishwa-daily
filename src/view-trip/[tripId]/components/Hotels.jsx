// import React from 'react'

// function Hotels({trip}) {
//   return (
//     <div>
//         <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

//         <div>
//             {trip?.tripData?.travelPlan?.Hotels?.map((item,index)=>(
//                 <div>
//                     <img src="/placeholder.jpg" className='rounded-lg'/>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Hotels

// import React from 'react';

// function Hotels({ trip }) {
//   const hotels = trip?.tripData?.travelPlan?.hotels || []; // Access the hotels correctly

//   return (
//     <div>
//       <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
//       <div>
//         {hotels.length > 0 ? (
//           hotels.map((item, index) => (
//             <div key={index} className="mb-4">
//               <img
//                 src={item.hotelImageUrl || "/placeholder.jpg"}
//                 alt={item.hotelName}
//                 className="rounded-lg w-full"
//               />
//               <h3 className="text-lg font-semibold mt-2">{item.hotelName}</h3>
//               <p>{item.description}</p>
//               <p>Price: {item.price}</p>
//               <p>Rating: {item.rating}</p>
//               <p>{item.hotelAddress}</p>
//             </div>
//           ))
//         ) : (
//           <p>No hotels available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Hotels;

// import React from "react";
// import { Link } from "react-router-dom";

// function Hotels({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

//       <div className="grid grid-cols-2 my-5 md:grid-cols-3 xl:grid-cols-4 gap-5">
//         {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
//           <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress}target='_blank'
//           >
//             <div className="hover:scale-105 transition-all cursor-pointer">
//               <img src={"/placeholder.jpg"} className="rounded-xl" />
//               <div className="my-2 flex flex-col gap-2">
//                 <h2 className="text-black font-medium">{hotel?.hotelName}</h2>
//                 <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
//                 <h2 className="text-black text-sm">💰 {hotel?.price}</h2>
//                 <h2 className="text-black text-sm">⭐ {hotel?.rating}</h2>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Hotels;




import React from "react";

import HotelCarditems from "./HotelCarditems";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 my-5 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (

          <HotelCarditems hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;