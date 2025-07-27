import React from 'react'
import Product from '../contents/App'
import LoginPage from '../contents/pages/LoginPage'
import SignIn from '../contents/pages/Signup'
// import Dashboard from '../contents/pages/Dashboard'
import { Route, Routes, Navigate } from 'react-router-dom'
import PrivateRoute from '../contents/components/PrivateRoute'

const MainRoutes = () => {
  return (
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignIn />} />
        {/* Protect /content/* with PrivateRoute */}
        <Route path="/content/*" element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        } />
      </Routes>
  )
}

export default MainRoutes
