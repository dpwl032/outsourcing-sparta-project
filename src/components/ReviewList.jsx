import React from 'react';
import EditReview from './EditReview';
import styled from 'styled-components';
import { CustomButton } from './CustomButton';

const ReviewList = ({ reviews, isEditingReview, onReviewEdit, onReviewDelete, onReviewUpdated }) => {
  return (
    <Container>
      {reviews.map((review, index) => (
        <div key={index}>
          {isEditingReview === review.id ? (
            <EditReview review={review} onSave={onReviewUpdated} onCancel={() => onReviewEdit(null)} />
          ) : (
            <ReviewWrapper>
              {review.createdBy === localStorage.getItem('userId') ? (
                <ButtonWrapper>
                  <CustomButton text={'수정'} type="button" onClick={() => onReviewEdit(review.id)} />
                  <CustomButton text={'삭제'} type="button" onClick={() => onReviewDelete(review.id)} />
                </ButtonWrapper>
              ) : (
                ''
              )}
              <StyledReview>
                <p>리뷰 : {review.content}</p>
                <p>작성자 : {review.createdBy}</p>
              </StyledReview>
            </ReviewWrapper>
          )}
        </div>
      ))}
    </Container>
  );
};

export default ReviewList;

const Container = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 0.5rem;
  width: 40rem;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  margin: 1rem;
  height: 10rem;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const StyledReview = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 7rem;
  display: flex;
  padding: 1rem;
  gap: 3px;
  & button {
    width: 3.5rem;
    font-size: 0.6rem;
  }
`;
