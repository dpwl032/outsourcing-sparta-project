import React, { useState } from 'react';

const EditReview = ({ review, onSave, onCancel }) => {
  const [content, setContent] = useState(review.content);

  const handleSave = () => {
    onSave({ ...review, content });
  };

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>저장</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

export default EditReview;