export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo traveler in exploration',
    icon: '✈',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '🥂',
    people: '2 people',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adventurers',
    icon: '🏡',
    people: '3 to 5 people',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill seekers',
    icon: '⛵',
    people: '5 to 10 people',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about cost',
    icon: '💸',
  },
];

export const AI_Prompt = `Generate Travel Plan for Location : {location} for {totalDays} Days for {travelers} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.

Output the JSON in this specific format:
{
  "travelPlan": {
    "location": "{location}",
    "duration": "{totalDays}",
    "budget": "{budget}",
    "travelers": "{travelers}",
    "hotels": [
      {
        "hotelName": "...",
        "hotelAddress": "...",
        "price": "...",
        "hotelImageUrl": "...",
        "geoCoordinates": "...",
        "rating": "...",
        "description": "..."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "plan": [
          {
            "placeName": "...",
            "placeDetails": "...",
            "placeImageUrl": "...",
            "geoCoordinates": "...",
            "ticketPricing": "...",
            "rating": "...",
            "timeTravel": "...",
            "timeToVisit": "...",
            "timeToSpend": "...",
            "placeType": "..."
          }
        ]
      }
    ]
  }
}
`;
