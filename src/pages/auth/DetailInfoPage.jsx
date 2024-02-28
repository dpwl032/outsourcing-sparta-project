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
import { CustomButton } from '../../components/CustomButton';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { FaShareAlt } from 'react-icons/fa';
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
  const [click, setClick] = useState(false);

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
        setLikeUser(response.data.createdBy);

        let words = response.data.youtubeId.split('=');
        let getYoutubeId = words[1];

        setShowMovie(getYoutubeId);

        // console.log('주소', getYoutubeId);

        // // const regularExpression =
        // //   /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        // // const match = showMovie.match(regularExpression);

        // if (match) {
        //   const videoId = match[1];
        //   console.log('YouTube Video ID:', videoId);
        // } else {
        //   console.log('URL is not a valid YouTube video URL.');
        // }
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

  const detailImg = businessInfo?.contentsImg;

  return (
    <>
      {/**전체랩 */}
      {businessInfo && !isEditing && (
        <DetailContentsAllWrap>
          <DetailItemWrap>
            <PreViewInfoWrap>
              <PreViewImg>
                <img src={detailImg} style={{ width: '100%', height: '375px', borderRadius: '10px' }} />
              </PreViewImg>
              <PreViewDescription>
                <DescriptionTitle>
                  <p style={{ margin: '10px 0 10px 10px ' }}>{businessInfo.title}</p>
                  <p style={{ margin: '10px 0 10px 10px' }}>{businessInfo.price}</p>
                  {userRole === 'host' && (
                    <div style={{ display: 'flex', margin: '50px 0px 10px 10px', gap: '10px' }}>
                      <p>
                        <CustomButton type="button" text="클래스 수정" onClick={handleEdit} />
                      </p>
                      <p>
                        <CustomButton type="button" text="클래스 삭제" onClick={handleDelete} />
                      </p>
                    </div>
                  )}
                </DescriptionTitle>
                <DescriptionCompany>
                  <div>
                    <FaRegCalendarCheck /> {businessInfo.time}
                  </div>{' '}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      {' '}
                      <FaShareAlt /> 공유하기
                    </div>
                    <div>
                      <button>찜하기</button>
                    </div>
                  </div>
                </DescriptionCompany>
              </PreViewDescription>
            </PreViewInfoWrap>
            <DetailContentsInfo>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '768px', marginTop: '50px' }}>
                  <div style={{ border: '1px solid black', width: '768px', height: '405px' }}>
                    {' '}
                    <iframe
                      id="ytplayer"
                      type="text/html"
                      width="768"
                      height="405"
                      src={`https://www.youtube.com/embed/${showMovie}`}
                      frameBorder="0"
                      allowFullScreen="allowFullScreen"
                    ></iframe>
                  </div>{' '}
                </div>{' '}
              </div>

              <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bolder', borderTop: '2px solid black' }}>
                <p style={{ marginTop: '20px' }}>상세 정보 </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div>{businessInfo.contents}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {!click ? (
                  <DetailButton onClick={() => setClick(!click)}>상세정보 더 보기</DetailButton>
                ) : (
                  <ResetButton onClick={() => setClick(!click)}>
                    <div> 커리큘럼</div>
                    <ol className="numbered">
                      <li>
                        <span>10분</span> <span>작가 및 회원소개</span>
                      </li>
                      <li>
                        {' '}
                        <span>120분</span> <span>클래스 수업</span>
                      </li>
                      <li>
                        {' '}
                        <span>10분</span> <span>개별 및 단체 촬영 후 종료</span>
                      </li>
                      <li>
                        <span>100분</span> <span> 뒤풀이(선택사항)</span>
                      </li>
                    </ol>
                  </ResetButton>
                )}
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
                        <MapPointer>{businessInfo.addressName}</MapPointer>
                      </CustomOverlayMap>
                    </Map>
                  </MapItemSection>
                  <MapInfo>
                    <div style={{ width: '50%', margin: '1rem' }}>위치</div>
                    <div style={{ margin: '1rem' }}>{businessInfo.addressName}</div>
                  </MapInfo>
                </KakaoMapWrap>
                {/*맵*/}
              </div>
            </MapInfoWrap>
            <div>
              <div>
                {userRole !== 'host' ? (
                  <>
                    <p style={{ marginBottom: '20px', fontSize: '18px' }}> 리뷰 목록</p>{' '}
                    {userRole !== 'host' && <WriteReview onReviewSubmitted={fetchReviews} />}
                    <ReviewList
                      reviews={reviews}
                      isEditingReview={isEditingReview}
                      onReviewEdit={handleReviewEdit}
                      onReviewDelete={handleReviewDelete}
                      onReviewUpdated={handleReviewUpdated}
                    />
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </DetailItemWrap>
        </DetailContentsAllWrap>
      )}

      <div>
        {!businessInfo && <p>Loading...</p>}
        {businessInfo && isEditing && <EditBusinessInfo businessInfo={businessInfo} onSaved={handleSaved} />}
      </div>
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
  width: 50%;
  border-radius: 10px;
`;

const PreViewDescription = styled.div`
  width: 50%;
`;

const DescriptionTitle = styled.div`
  height: 70%;
  font-size: 20px;
`;

const DescriptionCompany = styled.div`
  border-top: 1px solid gray;
  height: 30%;
  margin-left: 10px;

  & > div {
    margin: 20px 0;
    margin-left: 10px;
  }
`;

const DetailContentsInfo = styled.div`
  border-top: 2px solid gray;
  height: 800px;
  display: flex;
  flex-direction: column;
`;

const MapInfoWrap = styled.div`
  border-top: 2px solid gray;
`;

const MapItemNavi = styled.div`
  margin: 20px 0;
  font-size: 18px;
  font-weight: bolder;
`;

//맵
const KakaoMapWrap = styled.div`
  border: 1px solid gray;
  width: 768px;
  height: 350px;
  border-radius: 5px;
  margin-bottom: 20px;
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

const DetailButton = styled.button`
  width: 327px;
  height: 56px;
  background-color: white;
  cursor: pointer;
`;

const ResetButton = styled.button`
  all: unset;
`;

//css
