import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WriteReview from "./WriteReview";

function DetailInfoPage() {
  const { id } = useParams();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
      const fetchBusinessInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/businessInfo/${id}`);
          setBusinessInfo(response.data);
        } catch (error) {
          console.error("업체 정보를 가져오는 중 오류 발생:", error);
        }

      const fetchReviews = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/reviews`);
          setReviews(response.data);
        } catch (error) {
          console.error("리뷰 정보를 가져오는 중 오류 발생:", error);
        }
      };

      fetchReviews();
    };

    fetchBusinessInfo();

    const loggedUserRole = localStorage.getItem('host');
    setUserRole(loggedUserRole);
  }, [id]);

  return (
    <div>
      {businessInfo ? (
        <>
          <h1>{businessInfo.title}</h1>
          <p>진행시간: {businessInfo.time}</p>
          <p>가격: {businessInfo.price}</p>
          <p>주소지: {businessInfo.address}</p>
          {userRole === 'host' && (
            <>
              <button type="button">수정</button>
              <button type="button">삭제</button>
            </>
          )}
          {userRole !== 'host' && (
            <WriteReview />
          )}
          {reviews && reviews.map((review, index) => (
            <p key={index}>{review.content}</p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailInfoPage;