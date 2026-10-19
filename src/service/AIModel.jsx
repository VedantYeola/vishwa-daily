// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

//   import {
//       GoogleGenAI,
//     } from '@google/genai';

//     async function main() {
//       const ai = new GoogleGenAI({
//         apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
//       });
//       const config = {
//         responseMimeType: 'application/json',
//       };
//       const model = 'gemini-1.5-flash';
//       const contents = [
//         {
//           role: 'user',
//           parts: [
//             {
//               text: `Generate Travel Plan for Location: Las Vegas, for 3 Days  for Couple with a Cheap budget ,Give me a Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
//             },
//           ],
//         },
//         {
//           role: 'model',
//           parts: [
//             {
//               text: `I cannot access real-time information, including live pricing for hotels and attractions, or retrieve images from URLs.  Therefore, I can't provide the image URLs or exact current prices.  However, I can give you a JSON structure with the information you requested, populated with placeholder values. You will need to use online search engines (like Google, Expedia, Booking.com, etc.) to find current prices, hotel availability, and images.


//     \`\`\`json
//     {
//       "tripDetails": {
//         "location": "Las Vegas, Nevada",
//         "duration": "3 Days",
//         "travelers": "Couple",
//         "budget": "Cheap"
//       },
//       "hotel": {
//         "name": "Budget-Friendly Motel Example",
//         "address": "123 Example Ave, Las Vegas, NV 89101",  //Replace with actual address
//         "price_range": "$50-$80 per night (estimated)", //Replace with actual price range
//         "imageUrl": "placeholder_hotel_image_url.jpg", //Replace with actual image URL
//         "geoCoordinates": {
//           "latitude": 36.1699,
//           "longitude": -115.1398
//         },
//         "rating": 3.5,  //Replace with actual rating
//         "description": "Basic but clean motel offering affordable accommodations near the Strip.  Free parking typically available."
//       },
//       "itinerary": {
//         "day1": {
//           "date": "YYYY-MM-DD",
//           "plan": [
//             {
//               "placeName": "Fremont Street Experience",
//               "placeDetails": "Free pedestrian mall with light shows, street performers, and casinos.",
//               "imageUrl": "placeholder_fremont_street_image_url.jpg", //Replace with actual image URL
//               "geoCoordinates": {
//                 "latitude": 36.1699,
//                 "longitude": -115.1408
//               },
//               "ticketPricing": "Free",
//               "rating": 4.0,
//               "timeToSpend": "3-4 hours",
//               "bestTime": "Evening (for light shows)"
//             },
//             {
//               "placeName": "Container Park",
//               "placeDetails": "Unique shopping and dining area with a giant praying mantis sculpture.",
//               "imageUrl": "placeholder_container_park_image_url.jpg",
//               "geoCoordinates": {
//                 "latitude": 36.1684,
//                 "longitude": -115.1375
//               },
//               "ticketPricing": "Free (unless you purchase food or goods)",
//               "rating": 4.2,
//               "timeToSpend": "2 hours",
//               "bestTime": "Afternoon or Early Evening"
//             }
//           ]
//         },
//         "day2": {
//           "date": "YYYY-MM-DD",
//           "plan": [
//             {
//               "placeName": "The Strip (walking tour)",
//               "placeDetails": "Walk the length of the Strip, admiring the hotels and attractions. ",
//               "imageUrl": "placeholder_strip_image_url.jpg",
//               "geoCoordinates": {
//                 "latitude": 36.1066,
//                 "longitude": -115.1725
//               },
//               "ticketPricing": "Free (unless entering specific attractions)",
//               "rating": 4.5,
//               "timeToSpend": "4-5 hours",
//               "bestTime": "Anytime, but avoid midday heat"
//             },
//               {
//               "placeName": "Bellagio Fountains",
//               "placeDetails": "Free water show outside the Bellagio hotel. ",
//               "imageUrl": "placeholder_bellagio_fountains_image_url.jpg",
//               "geoCoordinates": {
//                 "latitude": 36.1101,
//                 "longitude": -115.1701
//               },
//               "ticketPricing": "Free",
//               "rating": 4.7,
//               "timeToSpend": "1 hour",
//               "bestTime": "Evening (for best visual effect)"
//             }

//           ]
//         },
//         "day3": {
//           "date": "YYYY-MM-DD",
//         "plan": [
//           {
//             "placeName": "Seven Magic Mountains",
//             "placeDetails": "Colorful art installation south of Las Vegas (requires transportation).",
//             "imageUrl": "placeholder_seven_magic_mountains_image_url.jpg",
//             "geoCoordinates": {
//               "latitude": 35.9634,
//               "longitude": -114.9925
//             },
//             "ticketPricing": "Free",
//             "rating": 4.3,
//             "timeToSpend": "1-2 hours",
//             "bestTime": "Anytime, but consider the heat"
//           },
//           {
//             "placeName": "Red Rock Canyon National Conservation Area (optional, if time and transportation allows)",
//             "placeDetails": "Hiking and scenic drives (entrance fee may apply)",
//             "imageUrl": "placeholder_red_rock_canyon_image_url.jpg",
//             "geoCoordinates": {
//               "latitude": 36.1927,
//               "longitude": -115.7385
//             },
//             "ticketPricing": "$15 per vehicle (may vary)",
//             "rating": 4.6,
//             "timeToSpend": "3-4 hours",
//             "bestTime": "Morning or late afternoon to avoid heat"
//           }
//         ]
//       }
//     }
//   }
//   \`\`\`

//   Remember to replace all placeholder values with actual data before using this plan.  Consider transportation costs (Uber, Lyft, or bus) when budgeting.  Cheap eats are plentiful in Vegas – look for buffets, food courts, and local eateries to save money on food.  Enjoy your trip!
//   `,
//           },
//         ],
//       },
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `INSERT_INPUT_HERE`,    
//           },
//         ],
//       },
//     ];

//     const response = await ai.models.generateContentStream({
//       model,
//       config,
//       contents,
//     });
//     for await (const chunk of response) {
//       console.log(chunk.text);
//     }
//   }

//   main();



import { GoogleGenAI } from '@google/genai';

export async function generateTripPlan(prompt) {
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

  if (!apiKey) {
    throw new Error('Google Gemini API key not configured in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const config = {
    responseMimeType: 'application/json',
  };

  const model = 'gemini-1.5-flash-001';

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';
  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  return fullResponse;
}
