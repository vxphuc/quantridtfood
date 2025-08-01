// src/pages/Admin/ProductPage.jsx
import React from "react";
import ShowProduct from "../../../components/admin/product/ShowProduct";
const ProductPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h2 style={{marginLeft: "20px"}}>Trang tạo sản phẩm</h2>
      <ShowProduct />
    </div>
  );
};

export default ProductPage;