import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // number from 1 to 5, including decimals like 4.5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.floor(rating); // fully filled star
    const isHalf = i === Math.ceil(rating) && rating % 1 !== 0; // half-filled star

    stars.push(
      <div key={i} className="relative w-4 h-4">
        <Star
          className={`absolute inset-0 text-gray-300 ${isFilled ? 'text-yellow-500' : ''}`}
          fill={isFilled ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
        {isHalf && (
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              className="text-yellow-500"
              fill="currentColor"
              stroke="currentColor"
            />
          </div>
        )}
      </div>
    );
  }

  return <div className="flex items-center gap-x-3">{stars}</div>;
};

export default StarRating;
