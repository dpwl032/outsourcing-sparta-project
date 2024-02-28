import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchBusinessInfos = async () => {
  const { data } = await axios.get('http://localhost:5000/businessInfo');
  return data;
};

function BusinessList() {
  const { data: businessInfos, error, isError, isLoading } = useQuery('businessInfos', fetchBusinessInfos);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return console.log('Error: {error.message}');

  return (
    <ul>
      {businessInfos?.reverse().map((businessInfo) => (
        <li key={businessInfo.id}>
          <Link to={`/Details/${businessInfo.id}`}>{businessInfo.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BusinessList;