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
              {review.createdBy === localStorage.getItem('userId') ? (
                <div>
                  <button type="button" onClick={() => onReviewEdit(review.id)}>
                    수정
                  </button>
                  <button type="button" onClick={() => onReviewDelete(review.id)}>
                    삭제
                  </button>
                </div>
              ) : (
                ''
              )}
              <p>
                {review.content} - {review.createdBy}
              </p>{' '}
              <br />
              <br />
              <br />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ReviewList;
