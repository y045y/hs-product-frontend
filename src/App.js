import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [updateKey, setUpdateKey] = useState(0);

  const handleProductAdded = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">製品管理システム</h1>
      <div className="row">
        <div className="col-md-6">
          <ProductForm onProductAdded={handleProductAdded} />
        </div>
        <div className="col-md-6">
          <ProductList key={updateKey} />
        </div>
      </div>
    </div>
  );
};

export default App;
