import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { editBusinessInfo } from '../api/crudServiece';
import styled from 'styled-components';
import { CustomButton } from './CustomButton';

const InputField = ({ name, value, onChange, type }) => (
  <input type={type} name={name} value={value} onChange={onChange} />
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
    }
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
  };

  return (
    <Container>
      <p style={{ fontSize: '2rem' }}>클래스 수정</p>
      <Contents>
        <p>제목</p>
        <div>
          <InputField type="text" name="title" value={editedInfo.title} onChange={handleInputChange} />
        </div>
        <p>날짜</p>
        <div>
          <InputField type="date" name="time" value={editedInfo.time} onChange={handleInputChange} />
        </div>
        <p>가격</p>
        <div>
          <InputField type="text" name="price" value={editedInfo.price} onChange={handleInputChange} />
        </div>
        <p>내용</p>
        <div>
          <InputField type="text" name="contents" value={editedInfo.contents} onChange={handleInputChange} />
        </div>
      </Contents>
      <CustomButton text={'수정'} type="button" onClick={handleSave} />
    </Container>
  );
}

export default EditBusinessInfo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  gap: 1rem;
  & p {
    font-weight: bolder;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  width: 22rem;
  height: 22rem;
  padding-top: 2rem;
  gap: 1rem;
  & div {
    width: 60%;
    padding: 2px;
  }
  & input {
    width: 100%;
    height: 1.5rem;
    border: 1px solid gray;
    border-radius: 3px;
  }
  & p {
    display: flex;
    justify-content: flex-start;
    width: 60%;
  }
`;
