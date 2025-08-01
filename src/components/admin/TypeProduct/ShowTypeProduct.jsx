// src/components/admin/type-product/ShowTypeProduct.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./TypeProduct.module.css";
import api from "../../../api/axios";

const ShowTypeProduct = () => {
  const [data, setData] = useState([]);
  const [countDelete, setCountDelete] = useState(0);

  useEffect(() => {
    api
      .get("/typeProduct")
      .then((res) => {
        setData(res.data.typeProducts);
        setCountDelete(res.data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.patch(`/typeProduct/delete-sort/${id}`);
      const res = await api.get("/typeProduct");
      setData(res.data.typeProducts);
      setCountDelete(res.data.count);
    } catch (error) {
      console.error("Lỗi khi xoá loại sản phẩm:", error);
    }
  };

  return (
    <div className="container">
      <div className="mb-3">
        <NavLink to="/quan-tri/them-loai-san-pham" className="btn btn-primary me-2">
          Thêm mới
        </NavLink>
        <NavLink to="/quan-tri/thung-rac-loai-san-pham" className="btn btn-danger">
          Thùng rác ({countDelete})
        </NavLink>
      </div>

      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Tên loại sản phẩm</th>
            <th>Ảnh</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.image} alt={item.name} className={style.product_image} />
              </td>
              <td>
                <NavLink to="#" className="btn btn-success btn-sm me-2">Xem</NavLink>
                <NavLink to={`/quan-tri/sua-loai-san-pham/${item._id}`} className="btn btn-primary btn-sm me-2">Sửa</NavLink>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTypeProduct;
