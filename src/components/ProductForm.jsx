import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL;


  const handleSubmit = (e) => {
    e.preventDefault();

    if (price <= 0 || isNaN(price)) {
      alert('価格は0以上の値を入力してください。');
      return;
    }
    if (categoryId <= 0 || isNaN(categoryId)) {
      alert('有効なカテゴリIDを入力してください。');
      return;
    }

    setIsSubmitting(true);

    const newProduct = {
      productName,
      categoryId: parseInt(categoryId, 10),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    axios
      .post(`${BASE_URL}/products`, newProduct)
      .then(() => {
        onProductAdded();
        setProductName('');
        setCategoryId(0);
        setPrice(0);
        setStock(0);
      })
      .catch((err) => {
        console.error('Error adding product:', err);
        alert('製品追加に失敗しました。もう一度お試しください。');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="card shadow p-4">
      <h4 className="text-center text-success mb-4">製品追加</h4>
      <div className="mb-3">
        <label className="form-label">製品名</label>
        <input
          type="text"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">カテゴリID</label>
        <input
          type="number"
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">価格</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">在庫</label>
        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '追加'}
      </button>
    </form>
  );
};

export default ProductForm;
