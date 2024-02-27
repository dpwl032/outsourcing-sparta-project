import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Detail = () => {
  //처음 지도 그리기

  return (
    <>
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

      {/* 유튜브 API테스트 */}
    </>
  );
};

export default Detail;
