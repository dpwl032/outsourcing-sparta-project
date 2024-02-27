import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WriteReview from "../components/WriteReview";
import EditBusinessInfo from "../components/EditBusinessInfo";

function DetailInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/businessInfo/${id}`);
        setBusinessInfo(response.data);
      } catch (error) {
        console.error("업체 정보를 가져오는 중 오류 발생:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchBusinessInfo();
    fetchReviews();

    const loggedUserRole = localStorage.getItem('host');
    setUserRole(loggedUserRole);
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:5000/businessInfo/${id}`);
        navigate('/'); // Redirect to home or another appropriate page
      } catch (error) {
        console.error("업체 정보 삭제 중 오류 발생:", error);
        alert('삭제 실패. 다시 시도해주세요.');
      }
    }
  };

  const handleSaved = (updatedInfo) => {
    setBusinessInfo(updatedInfo);
    setIsEditing(false);
  };

  return (
    <div>
      {businessInfo && !isEditing && (
        <>
          <h1>{businessInfo.title}</h1>
          <p>진행시간: {businessInfo.time}</p>
          <p>가격: {businessInfo.price}</p>
          <p>주소지: {businessInfo.address}</p>
          {userRole === 'host' && (
            <>
              <button type="button" onClick={handleEdit}>수정</button>
              <button type="button" onClick={handleDelete}>삭제</button>
            </>
          )}
          {userRole !== 'host' && <WriteReview />}
          {reviews && reviews.map((review, index) => (
            <p key={index}>{review.content}</p>
          ))}
        </>
      )}

      {!businessInfo && <p>Loading...</p>}
      {businessInfo && isEditing && (
        <EditBusinessInfo businessInfo={businessInfo} onSaved={handleSaved} />
      )}
    </div>
  );
}

export default DetailInfoPage;