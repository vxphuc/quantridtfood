// src/pages/Admin/BannerPage.jsx
import React from "react";
import CreateBanner from "../../components/admin/CreateBanner";
import ShowBanner from "../../components/admin/Banner/ShowBanner";
const BannerPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h1>Quản lý Banner</h1>
      <CreateBanner />
      <ShowBanner />
    </div>
    
  );
};

export default BannerPage;
