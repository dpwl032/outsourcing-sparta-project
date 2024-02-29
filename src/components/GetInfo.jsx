import React, { useEffect, useState } from 'react';

const { kakao } = window;

const KaKao = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
      level: 3 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보
      const latlng = mouseEvent.latLng;
      const latitude = latlng.getLat();
      const longitude = latlng.getLng();

      setLat(latitude);
      setLon(longitude);

      console.log('latitude:', latitude);
      console.log('longitude:', longitude);
    });
  }, []); // useEffect 디펜던시 배열은 비워두어 한 번만 실행되도록 설정

  return (
    <div>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
      <p>위도: {lat}</p>
      <p>경도: {lon}</p>
    </div>
  );
};

export default KaKao;
