import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

// Define Card Props Type
type CardProps = {
  venueName: string;
  imgSrc: string;
  rating: number | null;
  onRatingChange: (venueName: string, newRating: number | null) => void;
};

export default function Card({ venueName, imgSrc, rating, onRatingChange }: CardProps) {
  const [localRating, setLocalRating] = useState<number | null>(rating);

  const handleChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setLocalRating(newValue);
    onRatingChange(venueName, newValue); // Notify parent (CardPanel)
  };

  return (
    <InteractiveCard contentName={venueName}>
      <div className='w-full h-[70%] relative rounded-t-lg'>
        <Image src={imgSrc}
          alt='Hall Picture'
          fill={true}
          className='object-cover rounded-t-lg'
        />
      </div>
      <div className='w-full h-[30%] p-[10px]'>
        {venueName}
        <Rating
          id={`${venueName} Rating`}
          name={`${venueName} Rating`}
          data-testid={`${venueName} Rating`}
          value={localRating}
          onChange={handleChange}
        />
      </div>
    </InteractiveCard>
  );
}
