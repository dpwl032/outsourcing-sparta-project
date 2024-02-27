import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function DetailInfoPage() {
  const { id } = useParams();
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const qry = query(collection(db, "BusinessInfo"), where("id", "==", id));
        const querySnapshot = await getDocs(qry);
        
        querySnapshot.forEach((doc) => {
          setBusinessInfo(doc.data());
        });
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
            <p>{businessInfo.time}</p>
            <p>{businessInfo.time_}</p>
            <p>{businessInfo.price}</p>
            <p>{businessInfo.address}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailInfoPage;