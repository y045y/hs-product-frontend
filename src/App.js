import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [updateKey, setUpdateKey] = useState(0); // データ更新用のキー

  const handleProductAdded = () => {
    setUpdateKey((prevKey) => prevKey + 1); // 新しいデータを取得
  };

  return (
    <div>
      <h1>製品管理システム</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList key={updateKey} />
    </div>
  );
};

export default App;
