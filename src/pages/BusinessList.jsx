import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BusinessList() {
  const [businessInfos, setBusinessInfos] = useState([]);

  useEffect(() => {
    const fetchBusinessInfos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/businessInfo');
        setBusinessInfos(response.data.reverse());
      } catch (error) {
        console.error('비즈니스 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchBusinessInfos();
  }, []);

  return (
    <ul>
      {businessInfos.map((businessInfo) => (
        <li key={businessInfo.id}>
          <Link to={`/Details/${businessInfo.id}`}>{businessInfo.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BusinessList;