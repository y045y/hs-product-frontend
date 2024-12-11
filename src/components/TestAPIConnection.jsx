import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAPIConnection = () => {
  // 環境変数が設定されていない場合のフォールバックとしてデフォルトURLを使用
  const BASE_URL = process.env.REACT_APP_API_URL || "https://hs-product-backend-h7daazbef5a2fzaa.canadacentral-01.azurewebsites.net";
  const [status, setStatus] = useState("API接続テスト中...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        console.log("API Response:", response.data);
        setStatus("API接続成功: データ取得完了");
      } catch (err) {
        console.error("API Error:", err.message);
        setStatus(`API接続失敗: ${err.message}`);
      }
    };

    fetchData();
  }, [BASE_URL]); // BASE_URLが変更された場合に再実行

  return <div>{status}</div>;
};

export default TestAPIConnection;
