import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]); // カテゴリデータの状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = "https://hs-product-backend-h7daazbef5a2fzaa.canadacentral-01.azurewebsites.net";

  // カテゴリデータを取得
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => {
        console.log("Categories fetched:", response.data);
        setCategories(response.data); // カテゴリデータを保存
      })
      .catch((err) => {
        console.error("Error fetching categories:", err.message);
      });
  }, []); // 最初の1回だけ実行

  const handleSubmit = (e) => {
    e.preventDefault();

    if (price <= 0 || isNaN(price)) {
      alert('価格は0以上の値を入力してください。');
      return;
    }

    if (!categoryId) {
      alert('カテゴリを選択してください。');
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
        setCategoryId('');
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
        <label className="form-label">カテゴリ</label>
        <select
          className="form-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">カテゴリを選択してください</option>
          {categories.map((category) => (
            <option key={category.CategoryId} value={category.CategoryId}>
              {category.CategoryName}
            </option>
          ))}
        </select>
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
