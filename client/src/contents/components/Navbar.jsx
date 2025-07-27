import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from './Navbar.module.css' // Import CSS for styling

const Navbar = () => {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.logo}>
        <h2>PRODUCT</h2>
        <p>DASHBOARD</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={'/content/dash'}>Dashboard</Link>
          </li>
          
          <li>
            <Link to="/content/table">Product List </Link>
          </li>
          
          

          <li>
            <Link to={'/content/addprdt'}>Add Product</Link>
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;