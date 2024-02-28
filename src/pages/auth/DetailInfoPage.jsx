import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WriteReview from '../../components/WriteReview';
import EditBusinessInfo from '../../components/EditBusinessInfo';
import ReviewList from '../../components/ReviewList';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useMutation, queryClient, useQueryClient, useQuery } from 'react-query';
import { addLikes } from '../../api/mutationFns';

function DetailInfoPage() {
  const likesMutation = useMutation(addLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries('businessInfo');
    }
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(null);
  //test 코드
  const [addressLat, setLat] = useState('');
  const [addressLng, setLng] = useState('');
  const [showMovie, setShowMovie] = useState('');
  const [likeUser, setLikeUser] = useState('');

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
        //추가-예지
        setLat(response.data.addressLat);
        setLng(response.data.addressLng);
        setShowMovie(response.data.youtube);
        setLikeUser(response.data.createdBy);
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
    alert('리뷰가 수정됐습니다.');
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

  const handleLike = async (reviewId) => {
    likesMutation.mutate({ likeUser, reviewId });
    console.log('test', likesMutation);
  };

  return (
    <>
      {/**전체랩 */}
      <DetailContentsAllWrap>
        <DetailItemWrap>
          컨첸트 랩
          <PreViewInfoWrap>
            <PreViewImg>1</PreViewImg>
            <PreViewDescription>
              <DescriptionTitle>
                <p style={{ margin: '10px 0 10px 10px ' }}>윤주당 프라이빗 시음회, 막걸리 클럽 [SQNC 013]</p>
                <p style={{ margin: '10px 0 10px 10px' }}>39,000원</p>
              </DescriptionTitle>
              <DescriptionCompany>업체명</DescriptionCompany>
            </PreViewDescription>
          </PreViewInfoWrap>
          <DetailContentsInfo>
            <div>상세정보</div>
            <div>
              <button>상세보기</button>
            </div>
          </DetailContentsInfo>
          <MapInfoWrap>
            <MapItemNavi>
              <p>진행하는 장소</p>
            </MapItemNavi>
            <div>
              {' '}
              {/*맵*/}
              <KakaoMapWrap>
                <MapItemSection>
                  <Map
                    center={{ lat: addressLat, lng: addressLng }}
                    style={{ width: '768px', height: '250px', borderRadius: '5px' }}
                  >
                    <CustomOverlayMap position={{ lat: addressLat, lng: addressLng }}>
                      <MapPointer>업체명</MapPointer>
                    </CustomOverlayMap>
                  </Map>
                </MapItemSection>
                <MapInfo>
                  <div style={{ width: '50%', margin: '1rem' }}>위치</div>
                  <div style={{ margin: '1rem' }}>주소</div>
                </MapInfo>
              </KakaoMapWrap>
              {/*맵*/}
            </div>
          </MapInfoWrap>
        </DetailItemWrap>
      </DetailContentsAllWrap>
    </>
  );
}

export default DetailInfoPage;

const DetailContentsAllWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailItemWrap = styled.div`
  width: 768px;
  margin: 1rem;
`;

const PreViewInfoWrap = styled.div`
  height: 375px;
  display: flex;
`;

const PreViewImg = styled.div`
  border: 1px solid black;
  width: 50%;
  border-radius: 10px;
`;

const PreViewDescription = styled.div`
  width: 50%;
`;

const DescriptionTitle = styled.div`
  border: 1px solid black;
  height: 70%;
  font-size: 20px;
`;

const DescriptionCompany = styled.div`
  border: 1px solid black;
  height: 30%;
`;

const DetailContentsInfo = styled.div`
  border: 1px solid black;
  height: 800px;
  display: flex;
  flex-direction: column;
`;

const MapInfoWrap = styled.div`
  border: 1px solid black;
`;

const MapItemNavi = styled.div`
  border: 1px solid black;
  margin: 20px 0;
  font-size: 18px;
`;

//맵
const KakaoMapWrap = styled.div`
  border: 1px solid gray;
  width: 768px;
  height: 350px;
  border-radius: 5px;
`;
const MapItemSection = styled.div`
  border-radius: '10px';
`;
const MapPointer = styled.div`
  color: #9971ff;
  font-size: 19px;
  font-weight: 700;
  border: 4px solid #9971ff;
  border-radius: 10px;
  padding: 2.5px;
  background-color: white;
`;

const MapInfo = styled.div`
  height: 100px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
