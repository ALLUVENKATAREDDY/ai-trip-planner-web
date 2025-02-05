import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {

  console.log("Trip Data:", trip);
  if (!trip || !trip.tripData || !trip.tripData.itinerary) {
    return <div>Loading...</div>; // Prevents errors when data is missing
  }

  const itinerary = trip.tripData.itinerary;
  console.log("Itinerary Data:", itinerary);

  return (
    <div className="mt-5">
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {Object.keys(itinerary).map((dayKey) => {
          const item = itinerary[dayKey];
          return (
            <div key={dayKey}>
              <h2 className="font-medium text-lg">Day {dayKey}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {Array.isArray(item.plan) && item.plan.length > 0 ? (
                  item.plan.map((place, idx) => (
                    <div key={idx} className="my-3">
                      <PlaceCardItem place={place} />
                    </div>
                  ))
                ) : (
                  <div>No places planned for this day</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
