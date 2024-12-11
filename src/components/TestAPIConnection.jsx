import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAPIConnection = () => {
  const BASE_URL = "https://hs-product-backend-h7daazbef5a2fzaa.canadacentral-01.azurewebsites.net";
  const [status, setStatus] = useState("API接続テスト中...");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        console.log("API Response:", response.data);
        setStatus("API接続成功: データ取得完了");
      })
      .catch((err) => {
        console.error("API Error:", err.message);
        setStatus(`API接続失敗: ${err.message}`);
      });
  }, []); // 必要に応じて依存配列を調整

  return <div>{status}</div>;
};

export default TestAPIConnection;
