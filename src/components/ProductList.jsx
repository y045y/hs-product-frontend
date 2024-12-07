import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 製品一覧を取得
    axios.get('http://localhost:3000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError('製品データの取得に失敗しました');
        console.error(err);
      });
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.ProductId !== id));
      })
      .catch((err) => {
        setError('製品削除に失敗しました');
        console.error(err);
      });
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>製品一覧</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ProductId}>
            {product.ProductName} - ¥{product.Price.toLocaleString()}
            <button onClick={() => deleteProduct(product.ProductId)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
