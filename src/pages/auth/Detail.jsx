import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import { getClass, getInfo, getReview, getProfile } from '../../api/queryFns';
import { addReview, deleteClass, editClass, reviewClass } from '../../api/mutationFns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  return (
    <>
      <div style={{}}>
        <div style={{}}>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Detail;
