import React, { useState } from 'react';
import axios from 'axios';

function WriteReview() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content !== '') {
      try {
        await axios.post('http://localhost:5000/reviews', {
          content: content,
        });
        setContent('');
        alert('작성이 완료됐습니다!');
      } catch (error) {
        console.error('리뷰 작성 중 오류가 발생했습니다', error);
        alert('작성 중 오류가 발생했습니다.');
      }
    } else {
      alert('내용을 입력해주세요!');
    }
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