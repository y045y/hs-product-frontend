import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || '製品データの取得に失敗しました');
        console.error(err);
      });
  }, [BASE_URL]);

  const deleteProduct = (id) => {
    if (!window.confirm('この製品を削除しますか？')) return;

    axios
      .delete(`${BASE_URL}/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.ProductId !== id));
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
        alert('製品削除に失敗しました。');
      });
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="alert alert-info">製品が存在しません。</div>;
  }

  const sortedProducts = [...products].sort((a, b) => a.ProductId - b.ProductId);

  return (
    <div className="card shadow p-4">
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
  );
};

export default ProductList;
