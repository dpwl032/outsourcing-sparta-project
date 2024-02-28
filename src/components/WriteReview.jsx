import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postReview } from '../api/crudServiece';
import styled from 'styled-components';
import { CustomButton } from './CustomButton';

function WriteReview({ onReviewSubmitted }) {
  const { id: pageId } = useParams();
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const reviewMutation = useMutation(postReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', pageId]);
      alert('리뷰가 성공적으로 작성되었습니다.');
      setContent('');
      if (onReviewSubmitted) onReviewSubmitted();
    },
    onError: (error) => {
      console.error('리뷰 작성 중 오류가 발생했습니다.', error);
      alert('리뷰 작성 중 오류가 발생했습니다.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인 정보를 찾을 수 없습니다.');
      return;
    }

    reviewMutation.mutate({
      content,
      createdOn: pageId,
      createdBy: userId
    });
  };

  return (
    <ReviewForm onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="당신의 솔찍한 리뷰를 입력해주세요!!"
      />
      <CustomButton text={'작성 완료'} type="submit" />
    </ReviewForm>
  );
}

export default WriteReview;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 2rem;
  gap: 1rem;
  & textarea {
    width: 100%;
    height: 5rem;
    resize: none;
    border-radius: 0.3rem;
  }
  & button {
    margin-top: 1rem;
    width: 6rem;
    height: 3rem;
  }
`;
