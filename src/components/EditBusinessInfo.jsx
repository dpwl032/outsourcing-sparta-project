import React, { useState } from 'react';
import axios from 'axios';

function EditBusinessInfo({ businessInfo, onSaved }) {
  const [editedInfo, setEditedInfo] = useState(businessInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/businessInfo/${editedInfo.id}`, editedInfo);
      alert('수정이 완료되었습니다!');
      onSaved(editedInfo);
    } catch (error) {
      console.error("업체 정보 수정 중 오류 발생:", error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={editedInfo.title}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="time"
        value={editedInfo.time}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        value={editedInfo.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        value={editedInfo.address}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSave}>저장</button>
    </div>
  );
}

export default EditBusinessInfo;