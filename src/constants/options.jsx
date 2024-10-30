export const travel = [
  {
    id: 1,
    title: 'Cheap Options',
    Description: 'Affordable yet enjoyable travel experiences.',
    options: {
      cheap: {
        activity: 'Backpacking',
        price: '$15/day',
      },
      conscious: {
        activity: 'Public Transport',
        price: '$5/day',
      },
    },
    url: 'https://res.cloudinary.com/dxur7svs7/image/upload/v1729917793/ak4ahh7fc5mm8brukkbm.jpg', // Replace with the actual image URL
  },
  {
    id: 2,
    title: 'Moderate Options',
    Description: 'Balanced experiences without breaking the bank.',
    options: {
      average: {
        activity: 'Guided City Tours',
        price: '$50/day',
      },
      luxury: {
        activity: 'Private Tours',
        price: '$100/day',
      },
    },
    url: 'https://res.cloudinary.com/dxur7svs7/image/upload/v1729917556/o9vetli3nc7gtdb1h6wk.jpg', // Replace with the actual image URL
  },
  {
    id: 3,
    title: 'Luxury Options',
    Description: 'Indulge yourself in the best experiences.',
    options: {
      luxury: {
        activity: 'Helicopter Tours',
        price: '$300/day',
      },
      indulgent: {
        activity: 'Private Yacht Rental',
        price: '$1000/day',
      },
    },
    url: 'https://res.cloudinary.com/df67zy4wm/image/upload/f_auto,q_auto/mv04csj73izwft1fdc4t', // Replace with the actual image URL
  },
];



export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {days} for {traveller} people with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,rating, Time t\ntravel each of the location for {days} days with each day plan with best time to visit  in JSON format.'