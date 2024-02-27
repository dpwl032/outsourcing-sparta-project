import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import { getClass, getInfo } from '../../api/queryFns';
import { addReview, deleteClass, editClass, reviewClass } from '../../api/mutationFns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Detail = () => {
  //처음 지도 그리기
  const queryClient = useQueryClient();
  const { isLoading, isError, data: classData } = useQuery('class', getClass);
  console.log(classData);
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery('user', getInfo, {
    onSuccess: (data) => {}
  });
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

  const findData = classData?.data?.find((item) => item.id === params.id);
  // const { id, classTitle, classContent, classImg, classPrice, classDate } = findData;

  if (isLoading) {
    return <div>...로딩중입니다</div>;
  }

  if (isError) {
    return <div>오류발생! 새로고침!</div>;
  }

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
  return (
    <>
      {/* 유튜브 API테스트 */}
      <div></div>

      <div>
        <div style={{ border: '1px soild black', width: '200px', height: '200px' }}>
          <div>{findData.classTitle}</div>
          <div>{findData.classContent}</div>
          <div>{findData.classImg}</div>
          <div>{findData.classPrice}</div>
          <div>{findData.classDate}</div>
          <button onClick={() => onClickClassDelete(findData.id)}>삭제</button>
          <button onClick={() => onClickClassEdit(findData.id)}>수정</button>
        </div>
      </div>

      {/* 주소 API테스트 */}
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

      {/* 찜 */}
      <button>찜하기...</button>
      <br />
      {/* 리뷰 */}
      <div>
        <div> 작성자 : {userData?.data?.nickname} </div>
        <form onSubmit={reviewSubmitHandler}>
          제목 : <input type="text" value={reviewContents} onChange={(e) => setReviewContents(e.target.value)} /> <br />
          내용 : <input type="text" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} /> <br />
          별점 :{' '}
          <select value={grade} onChange={selectGrade}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>리뷰 작성</button>
        </form>
      </div>
    </>
  );
};

export default Detail;
