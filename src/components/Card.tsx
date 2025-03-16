import React, { useState } from 'react';
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';

type CardProps = {
    venueName: string;
    imgSrc: string;
    rating: number | null;
    onRatingChange: (venueName: string, newRating: number | null) => void;
};

export default function Card ({venueName, imgSrc, rating, onRatingChange }: CardProps) {
    const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
        onRatingChange(venueName, newValue);
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
            <div className='w-full h-[30%] p-[10px] flex flex-col justify-between'>
                <div>{venueName}</div>
                <Rating
                id={`${venueName} Rating`}
                name={`${venueName} Rating`}
                data-testid={`${venueName} Rating`}
                value={rating}
                onChange={handleRatingChange}
                />
            </div>
        </InteractiveCard>
    );
}