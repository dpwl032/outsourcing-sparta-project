import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBusinessInfo } from '../api/businessInfoSlice';
import { v4 as uuidv4 } from 'uuid';

function AddBusinessInfo() {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && time && timeStamp && price && address) {
            const id = uuidv4();

            dispatch(addBusinessInfo({ id, title, time, timeStamp, price, address }));

            setTitle('');
            setTime('');
            setTimeStamp(Date.now());
            setPrice('');
            setAddress('');

            alert('등록이 완료되었습니다!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="프로그램 제목을 입력해주세요."
            />
            <input
                type="text"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="프로그램 시간을 입력해주세요."
            />
            <input
                type="date"
                name="timeStamp"
                value={timeStamp}
                onChange={(e) => setTimeStamp(e.target.value)}
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
                placeholder="업체주소지를 입력해주세요."
            />
            <button type="submit">등록</button>
        </form>
    );
}

export default AddBusinessInfo;