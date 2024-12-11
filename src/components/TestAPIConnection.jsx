import React, { useEffect } from 'react';
import axios from 'axios';

const TestAPIConnection = () => {
  const BASE_URL = "https://hs-product-backend-h7daazbef5a2fzaa.canadacentral-01.azurewebsites.net";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        console.log("API Response:", response.data);
      })
      .catch((err) => {
        console.error("API Error:", err.message);
      });
  }, [BASE_URL]);

  return <div>API接続テスト中...</div>;
};

export default TestAPIConnection;
