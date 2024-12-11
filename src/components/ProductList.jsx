import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const printRef = useRef(); // 印刷対象の要素を参照する ref を作成

  const BASE_URL = process.env.REACT_APP_API_URL || 'https://example.com/api';

  // 製品リストの取得
  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || '製品データの取得に失敗しました');
        console.error('Error fetching products:', err);
      });
  }, [BASE_URL]);

  // 印刷機能の設定
  const handlePrint = useReactToPrint({
    content: () => printRef.current, // 印刷対象を指定
  });

  // エラーメッセージの表示
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // 製品が存在しない場合の表示
  if (products.length === 0) {
    return <div className="alert alert-info">製品が存在しません。</div>;
  }

  return (
    <div className="card shadow p-4">
      <h4 className="text-center text-info mb-4">製品一覧</h4>
      {/* 印刷対象の要素 */}
      <div ref={printRef}>
        <ul className="list-group">
          {products.map((product) => (
            <li
              key={product.ProductId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {product.ProductName} - ¥{Number(product.Price).toLocaleString('ja-JP')}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* 印刷ボタン */}
      <button onClick={handlePrint} className="btn btn-primary mt-4">
        印刷
      </button>
    </div>
  );
};

export default ProductList;
