import React, { useState, useEffect } from 'react';
import { UserCircle, Star } from 'lucide-react';
import './RatingBar.css';

interface RatingBarProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ratingLabels = [
  { text: 'Strongly Disagree', shortText: 'S.Disagree', color: 'text-red-500', bgColor: 'rating-color-1' },
  { text: 'Disagree', shortText: 'Disagree', color: 'text-orange-500', bgColor: 'rating-color-2' },
  { text: 'Neutral', shortText: 'Neutral', color: 'text-yellow-500', bgColor: 'rating-color-3' },
  { text: 'Agree', shortText: 'Agree', color: 'text-lime-500', bgColor: 'rating-color-4' },
  { text: 'Strongly Agree', shortText: 'S.Agree', color: 'text-green-500', bgColor: 'rating-color-5' },
];

export const RatingBar: React.FC<RatingBarProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const getProgressColor = (currentValue: number) => {
    return `rating-color-${currentValue}`;
  };

  const handlePointClick = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const effectiveValue = hoverValue ?? value;

  // Function to determine which text to show based on screen size
  const getLabelText = (label: typeof ratingLabels[0], isMobile: boolean) => {
    return isMobile ? label.shortText : label.text;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="rating-bar-container">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1 user-avatar-container">
          <div className="relative group">
            <UserCircle 
              className="user-avatar" 
              aria-label="Anonymous User" 
            />
            <div className="avatar-hover-text">
              <span>Anonymous</span>
            </div>
          </div>
        </div>
        <div className="flex-grow space-y-6">
          {/* Rating Bar Container */}
          <div className="relative">
            {/* Custom Track */}
            <div className="rating-track">
              <div
                className={`rating-progress ${getProgressColor(effectiveValue)} transition-all duration-300 ease-out`}
                style={{ width: `${(effectiveValue - 1) * 25}%` }}
              />
            </div>

            {/* Rating Points */}
            <div className="rating-points">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handlePointClick(rating)}
                  onMouseEnter={() => !disabled && setHoverValue(rating)}
                  onMouseLeave={() => setHoverValue(null)}
                  disabled={disabled}
                  className={`rating-point ${rating <= effectiveValue ? getProgressColor(effectiveValue) : 'bg-gray-300'}
                    ${rating === effectiveValue ? 'active' : ''}`}
                  aria-label={`Rate ${rating} - ${ratingLabels[rating - 1].text}`}
                />
              ))}
            </div>
          </div>
          
          {/* Labels */}
          <div className="rating-labels">
            {ratingLabels.map((label, index) => (
              <div
                key={label.text}
                className={`rating-label-item ${
                  effectiveValue === index + 1
                    ? `active-label ${label.color}`
                    : ''
                }`}
              >
                <div className="rating-point-placeholder" />
                <span className="label-text">{getLabelText(label, isMobile)}</span>
                {effectiveValue === index + 1 && (
                  <Star className={`star-icon ${label.color}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
