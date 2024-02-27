import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '.././firebase';
import { collection, getDocs } from 'firebase/firestore';

function BusinessList() {
  const [businessInfos, setBusinessInfos] = useState([]);

  useEffect(() => {
    const fetchBusinessInfos = async () => {
      const querySnapshot = await getDocs(collection(db, 'BusinessInfo'));
      const businessList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBusinessInfos(businessList);
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