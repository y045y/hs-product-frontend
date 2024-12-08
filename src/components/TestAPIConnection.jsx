import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAPIConnection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        setData(response.data);
        console.log('API接続成功:', response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || '製品データの取得に失敗しました');
        console.error('API接続エラー:', err);
      });
  }, [BASE_URL]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>APIに接続しています...</div>
      )}
    </div>
  );
};

export default TestAPIConnection;
