import React from 'react';
import holiday from '../../assets/img/holiday.png';
import hostSignUp from '../../assets/img/hostSign.png';
import chocolate from '../../assets/img/Chocolate.png';
import item1 from '../../assets/img/item1.png';
import item2 from '../../assets/img/item2.png';
import item3 from '../../assets/img/item3.png';
import item4 from '../../assets/img/item4.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchBusinessInfos = async () => {
  const { data } = await axios.get('http://localhost:5000/businessInfo');
  return data;
};

const Home = () => {
  const { data: businessInfos, isLoading, isError } = useQuery('businessInfos', fetchBusinessInfos);

  if (isLoading) {
    return <p>...로딩중</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  return (
    <>
      <HomeContentsWrap>
        <HomeContentItems>
          <div>
            <img src={holiday} style={{ borderRadius: '5px', height: '300px', width: '768px' }} />
          </div>
          <NaviSection>주간 BEST 랭킹 🏆 </NaviSection>
          {/* {아이템 리스트} */}
          <div>
            <ClassUltag>
              {/*1*/}
              <ClassListsItem>
                <ClassOneItems>
                  <img src={item1} style={{ width: '180.75px', height: '180.75px', borderRadius: '5px' }} />
                </ClassOneItems>
                <ClassOneItems>
                  <ItemClassPlace>
                    <span>강원 전체</span>
                  </ItemClassPlace>
                  <ItemClassTitle>[출발확정] 3월1일 금강산, 딱 1자리! 고민할 시간이 없어요!</ItemClassTitle>
                  <ItemClassReview>별점</ItemClassReview>
                  <hr />
                  <ItemClassPrice>53,000원</ItemClassPrice>
                </ClassOneItems>
              </ClassListsItem>
              {/*1*/}
              {/*1*/}
              <ClassListsItem>
                <ClassOneItems>
                  {' '}
                  <img src={item2} style={{ width: '180.75px', height: '180.75px', borderRadius: '5px' }} />
                </ClassOneItems>
                <ClassOneItems>
                  <ItemClassPlace>
                    <span>강남/서초</span>
                  </ItemClassPlace>
                  <ItemClassTitle>재즈 바이닐의 낭만, 마이리틀케이브 재즈 오마카세[SQNC015]</ItemClassTitle>
                  <ItemClassReview>별점</ItemClassReview>
                  <hr />
                  <ItemClassPrice>35,000원</ItemClassPrice>
                </ClassOneItems>
              </ClassListsItem>
              {/*1*/}
              {/*1*/}
              <ClassListsItem>
                <ClassOneItems>
                  {' '}
                  <img src={item3} style={{ width: '180.75px', height: '180.75px', borderRadius: '5px' }} />
                </ClassOneItems>
                <ClassOneItems>
                  <ItemClassPlace>
                    <span>성동/광진</span>
                  </ItemClassPlace>
                  <ItemClassTitle>[인생 프사] 나에게 가장 이상적인 인생샷 만들기 프로젝트(일정협의)</ItemClassTitle>
                  <ItemClassReview>별점</ItemClassReview>
                  <hr />
                  <ItemClassPrice>69,000원</ItemClassPrice>
                </ClassOneItems>
              </ClassListsItem>
              {/*1*/}
              {/*1*/}
              <ClassListsItem>
                <ClassOneItems>
                  {' '}
                  <img src={item4} style={{ width: '180.75px', height: '180.75px', borderRadius: '5px' }} />
                </ClassOneItems>
                <ClassOneItems>
                  <ItemClassPlace>
                    <span>송파/강동</span>
                  </ItemClassPlace>
                  <ItemClassTitle>[드로잉살롱] 와인&미술과 만나는 시간</ItemClassTitle>
                  <ItemClassReview>별점</ItemClassReview>
                  <hr />
                  <ItemClassPrice>39,000원</ItemClassPrice>
                </ClassOneItems>
              </ClassListsItem>
            </ClassUltag>
          </div>
          {/* {아이템 리스트} */}
          <div>
            <img src={hostSignUp} style={{ width: '768px', marginTop: '20px' }} />
          </div>
          <NaviSection>이달의 통큰 할인 🐲</NaviSection>
          {/* {아이템 리스트} */}
          <div>
            <ClassUltag>
              {/*1*/}
              {businessInfos?.reverse().map((item) => (
                <LinkStyle to={`/Details/${item.id}`} key={item.id}>
                  <ClassListsItem>
                    <ClassOneItems>
                      <img src={item.contentsImg} style={{ height: '180px', width: '180px', borderRadius: '5px' }} />
                    </ClassOneItems>
                    <ClassOneItems>
                      <ItemClassPlace>
                        <span>{item.address}</span>
                      </ItemClassPlace>
                      <ItemClassTitle>{item.title}</ItemClassTitle>
                      <ItemClassReview>별점</ItemClassReview>
                      <hr />
                      <ItemClassPrice>{item.price}</ItemClassPrice>
                    </ClassOneItems>
                  </ClassListsItem>
                </LinkStyle>
              ))}
            </ClassUltag>
          </div>
          {/* {아이템 리스트} */}
          <div>
            <img src={chocolate} style={{ width: '768px' }} />
          </div>
        </HomeContentItems>
      </HomeContentsWrap>

      {/* <BusinessList /> */}
    </>
  );
};

export default Home;

const HomeContentsWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const HomeContentItems = styled.div`
  width: 768px;
`;

const NaviSection = styled.div`
  font-size: 22px;
  font-weight: bolder;
  margin-top: 30px;
  height: 40px;
  width: 768px;
`;

const ClassUltag = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const ClassListsItem = styled.li`
  height: 318px;
  width: 180px;
  margin-right: 12px;
`;

const ClassOneItems = styled.div`
  height: 60%;
`;

const ItemClassPlace = styled.div`
  width: 156px;
  height: 25px;
  font-size: 10px;
  font-weight: bolder;
  color: gray;
`;
const ItemClassTitle = styled.div`
  width: 156px;
  height: 49px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: bolder;
`;
const ItemClassReview = styled.div`
  width: 156px;
  height: 14px;
`;
const ItemClassPrice = styled.div`
  width: 156px;
  height: 20px;
  font-size: 14px;
`;

const LinkStyle = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
