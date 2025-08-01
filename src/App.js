import { useState } from 'react';
import styles from './style.module.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import BannerPage from "./page/admin/BannerPage";
import ProductPage from "./page/admin/CreateProduct/ProductPage";
import ProductTypePage from "./page/admin/CreateTypeProduct/ProductTypePage";
import OrderPage from "./page/admin/OrderPage/OrderPage";
import UserPage from "./page/admin/User/UserPage";
import LoginPage from './page/admin/login/loginPage'; 
import InfoUserPage from './page/admin/InfoUser/InfoUserPage';
import RecycleProduct from './page/admin/RecycleBinProduct/RecycleBinProductPage';
import RecycleTypeProduct from './page/admin/RecyTypeProduct/RecycleTypeProductPage';
import DetailOrderPage from './page/admin/DetailOrder/DetailOrderPage';
import UpdateProduct  from './page/admin/UpdateProduct/UpdateProductPage';
import UpdateTypeProductPage from './page/admin/UpdateTypeProduct/UpTypeProductPage';
import UpdateUserPage  from './page/admin/UpdateUser/UpdateUserPage';
import CreateProduct from './page/admin/CreateProduct/CreateProductPage';
import CreateTypeProduct from './page/admin/CreateTypeProduct/CreateTypeProduct';
import ManageAdminPage from './page/admin/ManageAdmin/ManageAdmin';


function App() {
  const [menuVisible, setMenuVisible] = useState(true);
  return (
    <Router>
      {!menuVisible && (
          <button
            onClick={() => setMenuVisible(true)}
            className={styles.toggleOutNav}
            style={{backgroundColor: '#1cf56fff', }}
          >
            ☰
          </button>
        )}
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <nav
          className="nav-bar"
          style={{
            display: menuVisible ? 'block' : 'none',
            width: '20%',
            height: '100vh',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #dee2e6',
            position: 'fixed',
            top: 0,
            left: 0,
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {menuVisible && (
            <button
              onClick={() => setMenuVisible(false)}
              className={styles.toggleInNav}
            >
              ☰
            </button>
          )}
          <h5 className="mb-3">Menu quản trị</h5>
          <div className="d-flex flex-column">
            <NavLink to="/dang-nhap" end
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Đăng nhập
            </NavLink>
            <NavLink to="/quan-tri" end
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Quản lý Admin
            </NavLink>
            <NavLink to="/quan-tri/banner" 
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Quản lý Banner</NavLink>
            <NavLink to="/quan-tri/san-pham" 
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Quản lý Sản phẩm</NavLink>
            <NavLink to="/quan-tri/loai-san-pham" 
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Quản lý Loại Sản phẩm</NavLink>
            <NavLink to="/quan-tri/don-hang" 
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Quản lý Đơn hàng</NavLink>
            <NavLink to="/quan-tri/nguoi-dung/thong-tin" 
            className={({ isActive }) => isActive ? `${styles.menuLink} ${styles.activeMenuLink}` : styles.menuLink}>
              Thông tin Người dùng</NavLink>
          </div>
        </nav>
        {/* Nội dung phải chiếm 70% */}
        <div style={{ width: menuVisible ? '80%' : '100%', padding: '20px', backgroundColor: 'rgb(235 235 235)', marginLeft: menuVisible ? '20%' : 0, transition: 'all 0.3s ease'}}>
          <Routes>
            <Route path="/quan-tri" element={<ManageAdminPage />} />
            <Route path="/quan-tri/banner" element={<BannerPage />} />
            <Route path="/quan-tri/san-pham" element={<ProductPage />} />
            <Route path="/quan-tri/loai-san-pham" element={<ProductTypePage />} />
            <Route path="/quan-tri/don-hang" element={<OrderPage />} />
            <Route path="/quan-tri/nguoi-dung/:uid" element={<UserPage />} />
            <Route path="/dang-nhap" element={<LoginPage />} />
            <Route path="/quan-tri/nguoi-dung/thong-tin" element={<InfoUserPage />} />
            <Route path="/quan-tri/thung-rac-san-pham" element={<RecycleProduct />} />
            <Route path="/quan-tri/thung-rac-loai-san-pham" element={<RecycleTypeProduct />} />
            <Route path="/quan-tri/don-hang/chi-tiet/:id" element={<DetailOrderPage />} />
            <Route path="/quan-tri/sua-san-pham/:slug/cap-nhap-san-pham" element={<UpdateProduct />} />
            <Route path="/quan-tri/sua-loai-san-pham/:id" element={<UpdateTypeProductPage />} />
            <Route path="/quan-tri/sua-nguoi-dung/:uid" element={<UpdateUserPage />} />
            <Route path="/quan-tri/them-san-pham" element={<CreateProduct />} />
            <Route path="/quan-tri/them-loai-san-pham" element={<CreateTypeProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
