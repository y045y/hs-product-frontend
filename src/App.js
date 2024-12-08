import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import TestAPIConnection from './components/TestAPIConnection'; // TestAPIConnectionを利用

const App = () => {
  const [updateKey, setUpdateKey] = useState(0);

  // 製品が追加された際にリストを更新
  const handleProductAdded = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">製品管理システム</h1>
      <div className="row">
        <div className="col-md-6">
          {/* 製品追加フォーム */}
          <ProductForm onProductAdded={handleProductAdded} />
        </div>
        <div className="col-md-6">
          {/* 製品リスト */}
          <ProductList key={updateKey} />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-center">API接続テスト</h3>
        {/* API接続テストセクション */}
        <TestAPIConnection />
      </div>
    </div>
  );
};

export default App;
