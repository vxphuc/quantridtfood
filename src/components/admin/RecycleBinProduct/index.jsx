import axios from "axios";
import { useEffect, useState } from "react";
import style from "./RecycleBinProduct.module.css";
import { NavLink, useNavigate   } from "react-router-dom";
import api from "../../../api/axios";
function RecycleBin() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  useEffect(() => {
    api
      .get("/product/Recycle-Bin")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleRestore = (id) => {
    api
      .patch(`/product/${id}/restore`)
      .then(()=>{
        navigate(0)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    api.delete(`/product/${id}/delete`)
    .then(() => {
      navigate(0)
    })
  };
  return (
    <div className="container">
      <NavLink className='btn btn-success mb-2' to= '/quan-tri/san-pham'>Quay về</NavLink>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Loại sản phẩm</th>
            <th scope="col">Thời gian xóa</th>
            <th scope="col">Ảnh sản phẩm</th>
            <th scope="col">tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{(item.typeProduct[0])?(item.typeProduct[0].name) : ''}</td>
                <td>{item.deletedAt}</td>
                <td>
                  <img
                    className={style.product_image}
                    src={`${item.image[0]}`}
                  ></img>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleRestore(item._id);
                    }}
                    className="btn btn-success ms-2"
                  >
                    {" "}
                    khôi phục
                  </button>
                  <button onClick={() =>{handleDelete(item._id)}} className="btn btn-danger ms-2"> Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecycleBin;
