import React from "react";
import ShowTypeProduct from "../../../components/admin/TypeProduct/ShowTypeProduct";
const ProductTypePage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h2 style={{marginLeft: "20px"}}>Trang Quản Lý Loại Sản Phẩm</h2>
      <ShowTypeProduct />
    </div>
  );
};

export default ProductTypePage;
