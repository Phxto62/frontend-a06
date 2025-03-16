'use client';
import { useReducer } from "react";
import Card from "./Card";

// Action Types
type Action =
  | { type: 'UPDATE_RATING'; venueName: string; rating: number | null }
  | { type: 'REMOVE_RATING'; venueName: string };

// Reducer Function
const ratingReducer = (state: Map<string, number | null>, action: Action) => {
  const newState = new Map(state);
  switch (action.type) {
    case 'UPDATE_RATING':
      newState.set(action.venueName, action.rating);
      return newState;
    case 'REMOVE_RATING':
      newState.delete(action.venueName);
      return newState;
    default:
      return state;
  }
};

// Mapping venue names to correct image paths
const venueImages: Record<string, string> = {
  "The Bloom Pavilion": "/img/bloom.jpg",
  "Spark Space": "/img/sparkspace.jpg",
  "The Grand Table": "/img/grandtable.jpg",
};

export default function CardPanel() {
  const initialRatings = new Map<string, number | null>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);

  const [ratings, dispatch] = useReducer(ratingReducer, initialRatings);

  const handleRatingChange = (venueName: string, newRating: number | null) => {
    dispatch({ type: 'UPDATE_RATING', venueName, rating: newRating });
  };

  const handleRemoveRating = (venueName: string) => {
    dispatch({ type: 'REMOVE_RATING', venueName });
  };

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          alignContent: "space-around",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {Array.from(initialRatings.keys()).map((venue) => (
          <Card
            key={venue}
            venueName={venue}
            imgSrc={venueImages[venue]}
            rating={ratings.get(venue) ?? 0}
            onRatingChange={handleRatingChange}
          />
        ))}
      </div>

      {/* Display rating list */}
      <div style={{ margin: "20px" }}>
        {Array.from(ratings.entries()).map(([venueName, rating]) => (
          <div
            key={venueName}
            data-testid={venueName}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => handleRemoveRating(venueName)}
          >
            {`${venueName} Rating: ${rating}`}
          </div>
        ))}
      </div>
    </div>
  );
}
