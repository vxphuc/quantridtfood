import React from "react";
import CreateTypeProduct from "../../../components/admin/CreateTypeProduct/CreateTypeProduct";
const CreateProductTypePage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h2 style={{marginLeft: "20px"}}>Trang Quản Lý Loại Sản Phẩm</h2>
      <CreateTypeProduct />
    </div>
  );
};

export default CreateProductTypePage;
