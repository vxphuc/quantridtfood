import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import api from "../../../api/axios";
function Taikhoanquanly() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(
          "/sign-in/user",
          {
            withCredentials: true,
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">mã tài khoản</th>
            <th scope="col">họ và tên</th>
            <th scope="col">số điện thoại</th>
            <th scope="col">Điểm tích lũy</th>
            <th scope="col">phân quyền</th>
            <th scope="col">tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <th scope="row">{user.uid}</th>
                <td>{user.name}</td>
                <td>{user.numberPhone}</td>
                <td>{user.token}</td>
                <td>{user.role}</td>
                <td>
                  <NavLink to={`/quan-tri/sua-nguoi-dung/${user.uid}`} className="btn btn-primary">Sửa</NavLink>
                  <NavLink to={`/quan-tri/nguoi-dung/${user.uid}`} className="btn btn-success ms-2">xem chi tiết</NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Taikhoanquanly;
