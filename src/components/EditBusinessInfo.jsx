import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { editBusinessInfo } from '../api/crudServiece';

const InputField = ({ name, value, onChange, type }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
  />
);

function EditBusinessInfo({ businessInfo, onSaved }) {
  const [editedInfo, setEditedInfo] = useState(businessInfo);
  const queryClient = useQueryClient();

  const mutation = useMutation(editBusinessInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('businessInfos');
      alert('수정이 완료되었습니다!');
      onSaved(editedInfo);
    },
    onError: (error) => {
      console.error('업체 정보 수정 중 오류 발생:', error);
      alert('수정 중 오류가 발생했습니다.');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleSave = () => {
    const { id, ...infoToUpdate } = editedInfo;
    if (id) {
      mutation.mutate({ id, infoToUpdate });
    } else {
      console.error('ID가 없어 정보를 수정할 수 없습니다.');
    }
  }

  return (
    <div>
      <InputField
        type="text"
        name="title"
        value={editedInfo.title}
        onChange={handleInputChange}
      />
      <InputField
        type="date"
        name="time"
        value={editedInfo.time}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="price"
        value={editedInfo.price}
        onChange={handleInputChange}
      />
      <InputField
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