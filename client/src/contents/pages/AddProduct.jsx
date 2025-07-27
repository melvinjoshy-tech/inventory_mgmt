import React, { useState } from 'react'
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productId: '',
    name: '',
    quantity: '',
    price: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5001/Product', product);
      setProduct({ productId: '', name: '', quantity: '', price: '' });
      setSuccess(res.data.message || 'Product Added successfully!');
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
    }
  };

  return (
    <div style={{
        backgroundColor: '#EEF2F3',
        height: '400px',
        width: '250px',
        borderRadius: '7px',
        marginLeft: '20px'
    }}>
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID: </label>
          <input name="productId" value={product.productId} onChange={handleChange} required />
        </div>
        <div>
          <label>Name: </label>
          <input name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity: </label>
          <input name="quantity" type="number" value={product.quantity} onChange={handleChange} required />
        </div>
        <div>
          <label>Price: </label>
          <input name="price" type="number" step="0.01" value={product.price} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add Product</button>
      </form>
      {success && <p style={{ marginTop: '10px', color: 'green' }}>{success}</p>}
      {error && <p style={{ marginTop: '10px', color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
}

export default AddProduct