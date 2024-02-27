import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailInfoPage() {
  const { id } = useParams();
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/businessInfo/${id}`);
        setBusinessInfo(response.data);
      } catch (error) {
        console.error("업체 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchBusinessInfo();
  }, [id]);

  return (
    <div>
      {businessInfo ? (
        <>
          <h1>{businessInfo.title}</h1>
          <p>진행시간: {businessInfo.time}</p>
          <p>가격: {businessInfo.price}</p>
          <p>주소지: {businessInfo.address}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailInfoPage;