import { useQuery } from 'react-query';
import { getTodos } from '../api/project';
import styled from 'styled-components';


function Detail() {
  const { isLoading, isError, data: todos } = useQuery('class', getTodos);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h2>오류가 발생하였습니다.</h2>;
  }

  return (
    <>
      <Wrapper>
        <RisDiv>
          <VideoWrap>
            {todos.map((item) => (
              <div key={item.id}>
                {item.id} 
                
                {item.classTitle}
              </div>
            ))}
          </VideoWrap>
          <ClassInfoBox>
            <button>
            {todos.map((item) => (
              <div key={item.id}>
                {item.id} 
                상세정보 더 보기
                {item.classTitle}
              </div>
            ))}
            </button>
          </ClassInfoBox>
          <KaKaoMapBox>
          {todos.map((item) => (
              <div key={item.id}>
                {item.id} 
                지도 api
                {item.classTitle}
              </div>
            ))}
          </KaKaoMapBox>
        </RisDiv>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const RisDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const VideoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 150px;
  background-color: lightgray;
`;

const ClassInfoBox = styled.h1`
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;

const KaKaoMapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 150px;
  background-color: lightgray;
`;

export default Detail;
