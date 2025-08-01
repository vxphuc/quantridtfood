// src/components/admin/product/ShowProduct.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./productAdmin.module.css";
import Pagination from "../../../components/Pagination";
import api from "../../../api/axios";
const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api
      .get(`/product?page=${currentPage}`)
      .then((res) => {
        setProducts(res.data);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
      });
  }, [currentPage]);

  const handleDelete = (id) => {
    api
      .patch(`/product/${id}/destroy`)
      .then(() => {
        window.location.href = "/quan-tri/san-pham";
      })
      .catch((error) => {
        console.error("Lỗi khi xóa sản phẩm:", error);
      });
  };

  return (
    <div className="container">
      <div className="mb-2">
        <NavLink to="/quan-tri/them-san-pham" className="btn btn-primary">
          Thêm mới sản phẩm
        </NavLink>
        <NavLink to="/quan-tri/thung-rac-san-pham" className="btn btn-danger ms-2">
          Thùng rác ({products.count ?? 0})
        </NavLink>
      </div>

      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Ảnh</th>
            <th>Giảm giá</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {products.results?.length > 0 ? (
            products.results.map((product, index) => {
              const price = Number.parseFloat(product.price);
              const typeProduct = product.typeProduct?.[0]?.name || "—";
              return (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>
                    {price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{typeProduct}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className={style.product_image}
                    />
                  </td>
                  <td>{product.discount}%</td>
                  <td>
                    <NavLink className="btn btn-primary btn-sm">Chi tiết</NavLink>
                    <NavLink
                      to={`/quan-tri/sua-san-pham/${product.slug}/cap-nhap-san-pham`}
                      className="btn btn-success btn-sm ms-2"
                    >
                      Sửa
                    </NavLink>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
    
  );
};

export default ShowProduct;
