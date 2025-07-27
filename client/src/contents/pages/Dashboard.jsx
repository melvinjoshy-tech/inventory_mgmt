import React from 'react';
import { Grid, Paper, Typography, useTheme } from '@mui/material';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

// Mock data for demonstration
const inventoryData = [
  { name: 'Electronics', stock: 45, capacity: 100, value: 12500 },
  { name: 'Clothing', stock: 78, capacity: 150, value: 8900 },
  { name: 'Furniture', stock: 23, capacity: 50, value: 21000 },
  { name: 'Books', stock: 56, capacity: 80, value: 3400 },
  { name: 'Toys', stock: 34, capacity: 60, value: 5600 },
];

const salesData = [
  { month: 'Jan', sold: 45, restocked: 30 },
  { month: 'Feb', sold: 52, restocked: 40 },
  { month: 'Mar', sold: 48, restocked: 35 },
  { month: 'Apr', sold: 60, restocked: 45 },
  { month: 'May', sold: 75, restocked: 50 },
  { month: 'Jun', sold: 65, restocked: 55 },
];

const lowStockItems = [
  { id: 'PROD-001', name: 'Office Chair', stock: 5, minStock: 10 },
  { id: 'PROD-007', name: 'Wireless Mouse', stock: 8, minStock: 15 },
  { id: 'PROD-012', name: 'Desk Lamp', stock: 3, minStock: 5 },
  { id: 'PROD-023', name: 'Monitor Stand', stock: 2, minStock: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Inventory Summary Cards
const SummaryCard = ({ title, value, subtitle }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
      <Typography variant="h5" sx={{ my: 1 }}>{value}</Typography>
      <Typography variant="caption" color="textSecondary">{subtitle}</Typography>
    </Paper>
  );
};

// Inventory by Category Chart
const InventoryBarChart = () => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>Inventory by Category</Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={inventoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stock" name="Current Stock" fill="#8884d8" />
        <Bar dataKey="capacity" name="Total Capacity" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);

// Sales vs Restocking Trend
const SalesTrendChart = () => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>Sales vs Restocking</Typography>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="sold" 
          name="Items Sold" 
          stroke="#ff7300" 
          activeDot={{ r: 8 }} 
        />
        <Line 
          type="monotone" 
          dataKey="restocked" 
          name="Items Restocked" 
          stroke="#387908" 
        />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

// Stock Value Distribution
const StockValueChart = () => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>Inventory Value Distribution</Typography>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={inventoryData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {inventoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
      </PieChart>
    </ResponsiveContainer>
  </Paper>
);

// Low Stock Items Table
const LowStockTable = () => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>Low Stock Alert</Typography>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Product ID</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Product Name</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Current Stock</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Minimum Required</th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.map((item) => (
            <tr key={item.id} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{item.id}</td>
              <td style={{ padding: 8 }}>{item.name}</td>
              <td style={{ padding: 8, textAlign: 'right', color: item.stock < item.minStock / 2 ? 'red' : 'inherit' }}>
                {item.stock}
              </td>
              <td style={{ padding: 8, textAlign: 'right' }}>{item.minStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Paper>
);

// Main Dashboard Component
const Dashboard = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/dashboard', {
      headers: { 'x-auth-token': getToken() }
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, []);
  
  // Calculate summary metrics
  const totalItems = inventoryData.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = inventoryData.reduce((sum, item) => sum + item.value, 0);
  const lowStockCount = lowStockItems.length;

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>Inventory Dashboard</Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Total Categories" 
            value={inventoryData.length} 
            subtitle="Product categories" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Total Items" 
            value={totalItems} 
            subtitle="In stock" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Inventory Value" 
            value={`$${totalValue.toLocaleString()}`} 
            subtitle="Total worth" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Low Stock Items" 
            value={lowStockCount} 
            subtitle="Needs attention" 
          />
        </Grid>
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <InventoryBarChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <StockValueChart />
        </Grid>
        <Grid item xs={12} md={8}>
          <SalesTrendChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <LowStockTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;