import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAPIConnection = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [status, setStatus] = useState("API接続テスト中...");

  useEffect(() => {
    if (!BASE_URL) {
      console.error("環境変数 'REACT_APP_API_URL' が設定されていません。");
      setStatus("API接続失敗: 環境変数が未設定です。");
      return;
    }

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
  }, [BASE_URL]); // BASE_URLが変更されたときのみ再実行

  return <div>{status}</div>;
};

export default TestAPIConnection;
