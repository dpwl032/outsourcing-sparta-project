import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WriteReview from '../components/WriteReview';
import EditBusinessInfo from '../components/EditBusinessInfo';
import ReviewList from '../components/ReviewList';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function DetailInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reviews?createdOn=${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('리뷰 정보를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/businessInfo/${id}`);
        setBusinessInfo(response.data);
      } catch (error) {
        console.error('업체 정보를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchUserRole = () => {
      const loggedUserRole = localStorage.getItem('host');
      setUserRole(loggedUserRole);
    };

    fetchBusinessInfo();
    fetchReviews();
    fetchUserRole();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaved = (updatedInfo) => {
    setBusinessInfo(updatedInfo);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:5000/businessInfo/${id}`);
        navigate('/');
      } catch (error) {
        console.error('업체 정보 삭제 중 오류 발생:', error);
        alert('삭제 실패. 다시 시도해주세요.');
      }
    }
  };

  const handleReviewEdit = (reviewId) => {
    setIsEditingReview(reviewId);
  };

  const handleReviewUpdated = async (updatedReview) => {
    await axios.put(`http://localhost:5000/reviews/${updatedReview.id}`, updatedReview);
    setIsEditingReview(null);
    fetchReviews();
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:5000/reviews/${reviewId}`);
        fetchReviews();
      } catch (error) {
        console.error('리뷰 삭제 중 오류 발생:', error);
        alert('리뷰 삭제 실패. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '768px' }}>
          <div style={{ border: '1px solid black', width: '768px', height: '500px' }}>유튜브</div>

          {businessInfo && !isEditing && (
            <>
              <h1>{businessInfo.title}</h1>
              <p>진행시간: {businessInfo.time}</p>
              <p>가격: {businessInfo.price}</p>
              <p>주소지: {businessInfo.address}</p>
              {/*맵*/}
              <div style={{ border: '1px solid gray', width: '768px', height: '350px', borderRadius: '5px' }}>
                <div style={{ borderRadius: '10px' }}>
                  <Map
                    center={{ lat: 37.50910779362899, lng: 127.04071296745333 }}
                    style={{ width: '768px', height: '250px', borderRadius: '5px' }}
                  >
                    <MapMarker position={{ lat: 37.50910779362899, lng: 127.04071296745333 }}>
                      <div
                        style={{
                          color: '#9971ff',
                          fontSize: '19px',
                          fontWeight: '700',
                          border: '4px solid #9971ff',
                          borderRadius: '10px',
                          padding: '2.5px'
                        }}
                      >
                        티하우스 절기
                      </div>
                    </MapMarker>
                  </Map>
                </div>
                <div
                  style={{
                    height: '100px',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ width: '50%', margin: '1rem' }}>위치</div>
                  <div style={{ margin: '1rem' }}>주소</div>
                </div>
              </div>
              {/*맵*/}
              {userRole === 'host' && (
                <>
                  <button type="button" onClick={handleEdit}>
                    수정
                  </button>
                  <button type="button" onClick={handleDelete}>
                    삭제
                  </button>
                </>
              )}

              {userRole !== 'host' && <WriteReview onReviewSubmitted={fetchReviews} />}

              <ReviewList
                reviews={reviews}
                isEditingReview={isEditingReview}
                onReviewEdit={handleReviewEdit}
                onReviewDelete={handleReviewDelete}
                onReviewUpdated={handleReviewUpdated}
              />
            </>
          )}
          {!businessInfo && <p>Loading...</p>}
          {businessInfo && isEditing && <EditBusinessInfo businessInfo={businessInfo} onSaved={handleSaved} />}
        </div>
      </div>
    </div>
  );
}

export default DetailInfoPage;
