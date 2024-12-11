import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const printRef = useRef();

  const BASE_URL = process.env.REACT_APP_API_URL;

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

  // 製品の削除
  const deleteProduct = (id) => {
    if (!window.confirm('この製品を削除しますか？')) return;

    axios
      .delete(`${BASE_URL}/products/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.ProductId !== id));
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
        alert('製品削除に失敗しました。');
      });
  };

  // 印刷機能
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: '製品一覧',
    onAfterPrint: () => console.log('印刷完了'),
  });

  // エラーメッセージの表示
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // 製品が存在しない場合の表示
  if (products.length === 0) {
    return <div className="alert alert-info">製品が存在しません。</div>;
  }

  // 製品リストをID順にソート
  const sortedProducts = [...products].sort((a, b) => a.ProductId - b.ProductId);

  return (
    <div>
      <div className="card shadow p-4" ref={printRef}>
        <h4 className="text-center text-info mb-4">製品一覧</h4>
        <ul className="list-group">
          {sortedProducts.map((product) => (
            <li
              key={product.ProductId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {product.ProductName} - ¥{Number(product.Price).toLocaleString('ja-JP')}
              </span>
              <button
                onClick={() => deleteProduct(product.ProductId)}
                className="btn btn-danger btn-sm"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary mt-4" onClick={handlePrint}>
        印刷
      </button>
    </div>
  );
};

export default ProductList;