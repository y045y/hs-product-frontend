import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      categoryId: parseInt(categoryId, 10),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    axios.post('http://localhost:3000/products', newProduct)
      .then(() => {
        onProductAdded();
        setProductName('');
        setCategoryId('');
        setPrice('');
        setStock('');
      })
      .catch((err) => {
        console.error('製品追加に失敗しました', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>製品追加</h2>
      <input
        type="text"
        placeholder="製品名"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="カテゴリID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="価格"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="在庫"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default ProductForm;
