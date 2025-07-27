import React from 'react'
import Navbar from './components/Navbar'
import ProductRoute from '../routes/ProductRoute'
import { StaticRouter } from 'react-router-dom'
import Styles from './App.module.css'

const App = () => {

  return (
    <>
      <div className={Styles.containerApp}>
        <Navbar />
      </div>
      <div className={Styles.content}>
        <ProductRoute />
       
      </div>
      
    </>
  )
}

export default App
