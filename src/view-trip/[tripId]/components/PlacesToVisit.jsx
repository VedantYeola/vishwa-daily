// import React from 'react';

// function PlacesToVisit({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-lg">Places to Visit</h2>

//       <div>
//         {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
//           <div key={index}>
//             <h2 className="font-medium text-lg"> {item.day}</h2>
//             {item.plan.map((place, index) => (
//               <div>
//                 <h2 className='font-medium text-sm text-orange-600'>{place.timeToVisit}</h2>
//                 <h2 className='font-medium text-sm text-orange-600'>{place.timeToSpend}</h2>
//                 <h2 className='font-medium text-sm text-orange-600'>{place.timeToVisit}</h2>
//                 <h2 className='font-medium text-sm text-orange-600'>{place.TimeTravel}</h2>
//                 <h2>{place.placeName}</h2>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;


import React from 'react';
import PlaceCarditems from './PlaceCarditems';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip?.tripData?.travelPlan?.itinerary.map((item) => (
          <div key={item?.day} className='mt-5'> {/* Assuming 'day' is unique for each itinerary item */}
            <div>
              <h2 className="font-medium text-lg">Day {item.day}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {item.plan.map((place) => (
                  <div key={place?.placeName} className=''> {/* Use place.placeName as the key */}
                    <h2 className='font-medium text-sm text-orange-600'>{place.timeToVisit}</h2>
                    <h2 className='font-medium text-sm text-orange-600'>{place.timeToSpend}</h2>
                    <h2 className='font-medium text-sm text-orange-600'>{place.placeType}</h2>
                    <PlaceCarditems place={place} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;