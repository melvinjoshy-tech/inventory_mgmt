import React from 'react'
import LoginPage from '../contents/pages/LoginPage'
import SignupForm from '../contents/pages/Signup'
import Dashboard from '../contents/pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import DataTable from '../contents/pages/ProdTable'
import AddProduct from '../contents/pages/AddProduct'

const ProductRoute = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupForm />} />
        <Route path='dash' element={<Dashboard />} />
        <Route path='table' element={<DataTable />} />
        <Route path='addprdt' element={<AddProduct />} />
    </Routes>
  )
}

export default ProductRoute