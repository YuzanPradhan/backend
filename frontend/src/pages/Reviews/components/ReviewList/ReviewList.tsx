import React from 'react';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import './ReviewList.css';

export interface ReviewQuestion {
  id: string;
  question: string;
  rating: number;
}

interface ReviewListProps {
  questions: ReviewQuestion[];
  onRatingChange: (questionId: string, rating: number) => void;
  disabled?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  questions,
  onRatingChange,
  disabled = false,
}) => {
  return (
    <div className="review-list">
      {questions.map((question) => (
        <ReviewCard
          key={question.id}
          question={question.question}
          rating={question.rating}
          onRatingChange={(value) => onRatingChange(question.id, value)}
          disabled={disabled} onCommentChange={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      ))}
    </div>
  );
};
