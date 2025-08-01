// src/components/admin/banner/ShowBanner.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import api from "../../../api/axios";
import style from "./ShowBanner.module.css"; // dùng nếu có css module riêng

const ShowBanner = () => {
  const [dataBanner, setDataBanner] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await api.get("/sign-in/banner");
      setDataBanner(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách banner:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/sign-in/banner/${id}/delete`);
      await fetchBanners(); // refresh lại sau khi xoá
    } catch (err) {
      console.error("Lỗi khi xóa banner:", err);
    }
  };

  return (
    <div>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Banner</th>
            <th>Thời gian tạo</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {dataBanner.map((banner, index) => (
            <tr key={banner._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  width="300"
                  height="200"
                  src={`https://dtweb.onrender.com/uploads/${banner.image}`}
                  alt={`banner-${index}`}
                />
              </td>
              <td>{banner.dateCreate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(banner.id)}
                >
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

export default ShowBanner;
