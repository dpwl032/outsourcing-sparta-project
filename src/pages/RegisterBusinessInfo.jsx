import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function AddBusinessInfo() {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && time && price && address) {
            const id = uuidv4();
            const userId = localStorage.getItem('userId');

            if (!userId) {
                alert('로그인 정보를 찾을 수 없습니다.');
                return;
              }

            try {
                await axios.post('http://localhost:5000/businessInfo', {
                    id,
                    createdBy : userId,
                    title,
                    time,
                    price,
                    address
                });

                setTitle('');
                setTime(Date.now());
                setPrice('');
                setAddress('');

                alert('등록이 완료되었습니다!');
            } catch (error) {
                console.error('데이터 전송 오류:', error.message);
                alert('등록 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="클래스 제목을 입력해주세요."
            />
            <input
                type="date"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="가격 정보를 입력해주세요."
            />
            <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="업체 주소지를 입력해주세요."
            />
            <button type="submit">등록</button>
        </form>
    );
}

export default AddBusinessInfo;