import React from 'react';
import EditReview from './EditReview';

const ReviewList = ({ reviews, isEditingReview, onReviewEdit, onReviewDelete, onReviewUpdated }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <div key={index}>
          {isEditingReview === review.id ? (
            <EditReview review={review} onSave={onReviewUpdated} onCancel={() => onReviewEdit(null)} />
          ) : (
            <>
              <p>{review.content}</p>
              <button type="button" onClick={() => onReviewEdit(review.id)}>
                수정
              </button>
              <button type="button" onClick={() => onReviewDelete(review.id)}>
                삭제
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ReviewList;
