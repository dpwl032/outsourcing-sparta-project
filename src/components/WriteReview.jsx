import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postReview } from '../api/crudServiece';

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
      createdBy: userId,
      nickname: localStorage.getItem('nickname')
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰를 입력해주세요!"
      />
      <button type="submit">작성 완료</button>
    </form>
  );
}

export default WriteReview;
