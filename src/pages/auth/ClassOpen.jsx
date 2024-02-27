import React from 'react';
import useInput from '../../hooks/useInput';
import { addClass } from '../../api/mutationFns';
import { getProfile, getInfo } from '../../api/queryFns';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';

const ClassOpen = () => {
  /** Queries */
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useQuery('user', getInfo);
  const { data: dbData, isLoading: isDbDataLoading, isError: isDbDataError } = useQuery('userRoles', getProfile);

  /** Mutations */
  const mutation = useMutation(addClass, {
    onSuccess: () => {
      queryClient.invalidateQueries('class');
    }
  });
  /** states */
  const [classTitle, onChangeClassTitleHandler] = useInput();
  const [classContent, onChangeClassContentHandler] = useInput();
  const [classImg, onChangeClassImgHandler] = useInput();
  const [classPrice, onChangeClassPriceHandler] = useInput();
  const [classDate, onChangeClassDateHandler] = useInput();
  const [classYoutube, onChangeClassYoutubeHandler] = useInput();
  const [classMap, onChangeClassMapHandler] = useInput();

  if (isUserLoading || isDbDataLoading) {
    return <p>...로딩중</p>;
  }

  if (isUserError || isDbDataError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  const userRole = dbData?.data.find((role) => role.userId === userData?.data?.id);

  if (userRole.role === 'guest') {
    alert('업체 계정만 이용할 수 있습니다!');
    return <Navigate to="/home" replace />;
  }
  const onClassSubmitHandler = (e) => {
    e.preventDefault();

    if (!classTitle || !classContent || !classImg || !classPrice || !classDate || !classMap) {
      alert('빈 곳없이 작성해주세요!');
      return;
    }

    mutation.mutate({
      classTitle,
      classContent,
      classImg,
      classPrice,
      classDate,
      classYoutube,
      classMap
    });

    alert('클래스 등록이 완료됐습니다');
    navigate('/home');
  };
  return (
    <div>
      <p>클래스 만들기</p>
      <form onSubmit={onClassSubmitHandler}>
        제목 : <input type="text" name="title" value={classTitle} onChange={onChangeClassTitleHandler} />
        <br />
        내용 : <input type="text" name="title" value={classContent} onChange={onChangeClassContentHandler} />
        <br />
        대표사진 : <input type="text" name="title" value={classImg} onChange={onChangeClassImgHandler} />
        <br />
        금액 : <input type="text" name="title" value={classPrice} onChange={onChangeClassPriceHandler} />
        <br />
        스케줄 : <input type="date" name="title" value={classDate} onChange={onChangeClassDateHandler} />
        <br />
        유튜브 주소 :<input type="text" name="title" value={classYoutube} onChange={onChangeClassYoutubeHandler} />
        <br />
        주소 :<input type="text" name="title" value={classMap} onChange={onChangeClassMapHandler} />
        <button>등록</button>
      </form>
    </div>
  );
};

export default ClassOpen;
