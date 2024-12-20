import React, { useState, useEffect } from 'react';
import { MessageSquare, MessageCircle, AlertCircle } from 'lucide-react';
import { RatingBar } from '../RatingBar/RatingBar';
import './ReviewCard.css';

interface ReviewCardProps {
  question: string;
  rating: number;
  onRatingChange: (value: number) => void;
  comment?: string;
  onCommentChange: (value: string) => void;
  disabled?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  question,
  rating,
  onRatingChange,
  comment = '',
  onCommentChange,
  disabled = false,
  onValidationChange,
}) => {
  const [localComment, setLocalComment] = useState(comment);
  const [isTouched, setIsTouched] = useState(false);
  const minCommentLength = 10;
  const maxCommentLength = 500;

  useEffect(() => {
    setLocalComment(comment);
  }, [comment]);

  const isCommentValid = localComment?.length >= minCommentLength && localComment?.length <= maxCommentLength;
  const showError = isTouched && !isCommentValid;

  useEffect(() => {
    onValidationChange?.(isCommentValid);
  }, [isCommentValid, onValidationChange]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length <= maxCommentLength) {
      setLocalComment(newComment);
      onCommentChange(newComment);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const getCharCountColor = () => {
    if (!localComment) return 'text-red-500';
    if (localComment.length < minCommentLength) return 'text-red-500';
    if (localComment.length > maxCommentLength - 50) return 'text-orange-500';
    return 'text-gray-500';
  };

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="question-container">
          <MessageSquare className="question-icon" />
          <h3 className="question-text">
            {question}
          </h3>
        </div>
      </div>
      <div className="review-card-body">
        <RatingBar
          value={rating}
          onChange={onRatingChange}
          disabled={disabled}
        />
        
        <div className="comment-section">
          <div className="comment-header">
            <div className="comment-label">
              <MessageCircle className="comment-icon" />
              <span>Feedback</span>
              <span className="required-badge">Required</span>
            </div>
          </div>
          
          <div className="comment-container">
            <textarea
              className={`comment-input ${showError ? 'error' : ''}`}
              value={localComment || ''}
              onChange={handleCommentChange}
              onBlur={handleBlur}
              placeholder="Please provide detailed feedback to support your rating..."
              rows={4}
              disabled={disabled}
              aria-invalid={showError}
              aria-required="true"
            />
            
            <div className="comment-footer">
              {showError && (
                <div className="error-message">
                  <AlertCircle className="error-icon" />
                  <span>Please provide at least {minCommentLength} characters of feedback</span>
                </div>
              )}
              <span className={`comment-char-count ${getCharCountColor()}`}>
                {localComment ? localComment.length : 0}/{maxCommentLength}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
