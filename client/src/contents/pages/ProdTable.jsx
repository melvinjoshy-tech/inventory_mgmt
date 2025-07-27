import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'SNo', width: 70 },
  { field: 'pid', headerName: 'ProductId', width: 130 },
  { field: 'productName', headerName: 'Product name', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 130 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 90,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5001/Product');
        // The backend returns { product: [...] }
        console.log(response.data)
        const products = (response.data.product || []).map((item, idx) => ({
          id: idx + 1,
          pid: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        }));
        setRows(products);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      {error && <div style={{ color: 'red', padding: 8 }}>{error}</div>}
    </Paper>
  );
};

export default DataTable;