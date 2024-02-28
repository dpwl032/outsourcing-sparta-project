import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import { getClass, getInfo, getReview, getProfile } from '../../api/queryFns';
import { addReview, deleteClass, editClass, reviewClass } from '../../api/mutationFns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoBookmark } from 'react-icons/go';
import { GoShare } from 'react-icons/go';
import styled from 'styled-components';
import { LuCalendarClock } from 'react-icons/lu';
import { TbCategoryMinus } from 'react-icons/tb';
import { RiBankCard2Line } from 'react-icons/ri';

const Detail = () => {
  //처음 지도 그리기
  const queryClient = useQueryClient();
  const { isLoading, isError, data: classData } = useQuery('class', getClass);
  const { data: reviewList } = useQuery('review', getReview);

  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useQuery('user', getInfo);
  const { data: dbData, isLoading: isDbDataLoading, isError: isDbDataError } = useQuery('userRoles', getProfile);

  const params = useParams();
  const navigate = useNavigate();

  /** Mutations */
  const deleteMutation = useMutation(deleteClass, {
    onSuccess: () => {
      queryClient.invalidateQueries('class');
    }
  });

  const reviewMutation = useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('review');
    }
  });

  const editMutation = useMutation(editClass, {
    onSuccess: () => {
      queryClient.invalidateQueries('class');
    }
  });

  //평점관리 state
  const [grade, setGrade] = useState('5');
  const [reviewContents, setReviewContents] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [click, setClick] = useState(false);

  const findData = classData?.data?.find((item) => item.id === params.id);
  // const { id, classTitle, classContent, classImg, classPrice, classDate } = findData;

  if (isLoading) {
    return <div>...로딩중입니다</div>;
  }

  if (isError) {
    return <div>오류발생! 새로고침!</div>;
  }

  const userRole = dbData?.data.find((role) => role.userId === userData?.data?.id);
  const writer = userRole?.role === 'guest' ? true : false;
  console.log('w', writer);

  const onClickClassDelete = (id) => {
    deleteMutation.mutate(id);
    alert('삭제완료');
    navigate('/home');
  };

  const onClickClassEdit = (id) => {
    editMutation.mutate(id);
    alert('수정완료');
    navigate('/home');
  };

  const selectGrade = (e) => {
    setGrade(e.target.value);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    reviewMutation.mutate({ reviewTitle, reviewContents, grade, classId: findData.id, userId: userData.data.id });
    alert('ㅇㅇ작성완료');
  };

  /** 유튜브*/

  return (
    <>
      <div style={{ border: '1px solid black', display: 'flex', justifyContent: 'center' }}>
        <div style={{ border: '1px solid black', width: '768px' }}>
          <div>
            <div style={{ border: '1px solid black', height: '500px' }}>youtube</div>
            <div
              style={{
                border: '1px solid black',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '24px'
              }}
            >
              <p> [2023 리뉴얼] JB김종봉의 2천만원으로 경제적 자유를 달성한 진짜 이야기</p>
            </div>
            <div
              style={{
                border: '1px solid black',
                height: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ marginLeft: '20px' }}>
                <ClassDetailBtn>신청하기</ClassDetailBtn>
              </div>
              <div>
                <span style={{ marginRight: '10px' }}>
                  {' '}
                  <GoBookmark size="30" />
                </span>
                <span style={{ marginRight: '20px' }}>
                  {' '}
                  <GoShare size="30" />
                </span>
              </div>
            </div>
            <div
              style={{
                border: '1px solid black',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '15px',
                marginLeft: '20px'
              }}
            >
              <span>
                <RiBankCard2Line />
                클래스 가격
              </span>
              <span>
                <LuCalendarClock /> 클래스 날짜
              </span>
              <span>
                <TbCategoryMinus /> 카테고리
              </span>
            </div>
            <div style={{ border: '1px solid black', height: '100px' }}>
              {click ? (
                <div>
                  {' '}
                  <p>상세 정보</p>
                  <div>내용ㅇㅇㅇㅇㅇㅇㅇㅇ</div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {' '}
                    <ClassDetailBtn onClick={(e) => setClick(false)}>숨기기</ClassDetailBtn>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {' '}
                  <ClassDetailBtn onClick={(e) => setClick(true)}>더보기</ClassDetailBtn>
                </div>
              )}
            </div>

            {/* 주소 API테스트 */}
            <p style={{ height: '30px' }}>진행하는 장소</p>
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
            {/** 맵*/}
            {/** 후기*/}

            <div>
              <div>
                <FlexUl style={{ margin: '1rem' }}>
                  <li>
                    <div style={{ border: '1px solid black', marginTop: '10px', margin: '1rem' }}>
                      <div style={{ height: '100px' }}> 사진 </div>
                      <span style={{ height: '20px' }}>리뷰제목 </span>
                    </div>

                    <div
                      style={{
                        border: '1px solid black',
                        marginTop: '10px',
                        display: 'flex',
                        margin: '1rem',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ height: '20px' }}>리뷰 작성자</div>
                      <div style={{ height: '50px' }}>리뷰 내용</div>
                      <button>삭제</button>
                    </div>
                  </li>
                  <li>
                    <div style={{ border: '1px solid black', marginTop: '10px', margin: '1rem' }}>
                      <div style={{ height: '100px' }}> 사진 </div>
                      <span style={{ height: '20px' }}>리뷰제목 </span>
                    </div>

                    <div
                      style={{
                        border: '1px solid black',
                        marginTop: '10px',
                        display: 'flex',
                        margin: '1rem',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ height: '20px' }}>리뷰 작성자</div>
                      <div style={{ height: '50px' }}>리뷰 내용</div>
                      <button>삭제</button>
                    </div>
                  </li>{' '}
                  <li>
                    <div style={{ border: '1px solid black', marginTop: '10px', margin: '1rem' }}>
                      <div style={{ height: '100px' }}> 사진 </div>
                      <span style={{ height: '20px' }}>리뷰제목 </span>
                    </div>

                    <div
                      style={{
                        border: '1px solid black',
                        marginTop: '10px',
                        display: 'flex',
                        margin: '1rem',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ height: '20px' }}>리뷰 작성자</div>
                      <div style={{ height: '50px' }}>리뷰 내용</div>
                      <button>삭제</button>
                    </div>
                  </li>
                </FlexUl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;

const ClassDetailBtn = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 170px;
  height: 50px;
  border-radius: 4px;
  background-color: black;
  color: white;
  font-size: 100%;
  font-weight: bolder;
  cursor: pointer;
`;

const FlexUl = styled.ul`
  display: flex;
  flex-wrap: wrap;

  & > li {
    border: 1px solid black;
    flex: 0 0 calc(33.33% - 10px); /* 3개의 요소가 한 줄에 배치되도록 함 (마진 고려하여 계산) */
    margin: 3px;
    height: 250px;
  }
`;
