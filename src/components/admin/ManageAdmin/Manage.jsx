import DashboardSummaryCards from "./Chart/Dashboard-summary-cards";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Manage.module.css";
import ChartColum from "../../ChartColum/ChartColum";
import { NavLink } from "react-router-dom";
import api from "../../../api/axios";
function ManageAdmin() {
  const [totalRevenueYear, setTotalRevenueYear] = useState([]);
  const [Top10Product, setTop10Product] = useState([]);
  const [revenueWeek, setRevenueWeek] = useState([]);
  const [revenueDay, setRevenueDay] = useState([]);

  useEffect(() => {
    // Lấy tổng doanh thu và đơn hàng đã bán được trong năm
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/chart/getYearRevenue"
        );
        setTotalRevenueYear(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Lấy 10 sản phẩm bán chạy nhất
    const fetchTop10Product = async () => {
      try {
        const response = await api.get(
          "/chart/getTop10Product"
        );
        setTop10Product(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchTop10Product();
  }, []);
  //lấy ra và so sánh doanh thu trong tuần
  useEffect(() => {
    const fetchRevenueWeek = async () => {
      try {
        const response = await api.get(
          `/chart/getWeekRevenue`
        );
        const transformed = response.data.weeklyRevenue.map((item) => {
          return {
            name: `Tuần ${item._id.week}`,
            "số tiền": item.totalRevenue.$numberDecimal,
          };
        });
        setRevenueWeek(transformed);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRevenueWeek();
  }, []);

  //lấy ra doanh thu theo ngày của tuần hiện tại
  useEffect(() => {
    const fetchRevenueDay = async () => {
      try {
        const response = await api.get(
          `/chart/getDayRevenue`
        );
        const transformed = response.data.dailyRevenue.map((item) => {
          return {
            name: `Thứ ${item._id.dayOfWeek}`,
            "số tiền": item.totalRevenue.$numberDecimal,
          }
        })
        setRevenueDay(transformed);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRevenueDay();
  }, []);

  return (
    <div>
      <NavLink to="/quan-tri/chat-bot" className="btn btn-primary">sử dụng AI để phân tích</NavLink>
      {/* tiêu đề */}
      <div className="text-center">
        <h2>Quản lý doanh thu</h2>
        <p>Thống kê doanh thu và đơn hàng đã bán được trong thời gian qua</p>
      </div>
      {/* hiển thị tổng số lượng doanh thu, và đơn hàng đã bán được trong thời gian qua */}
      <div className={`${styles.container} row`}>
        <DashboardSummaryCards
          className={`${styles.cards} text-center col-md-5`}
        >
          {totalRevenueYear.map((item, index) => {
            const totalRevenue = item.totalRevenue.$numberDecimal;
            const totalRevenueFormatted = Number.parseFloat(
              totalRevenue
            ).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            });
            return (
              <div key={item._id}>
                <div className={styles.caq1rd}>
                  <div className={styles.cardHeader}>
                    <p>Tổng doanh số năm {item._id.year}</p>
                  </div>
                  <div className={`${styles.cardBody} fw-bold`}>
                    <p>{totalRevenueFormatted}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </DashboardSummaryCards>
        <DashboardSummaryCards
          className={`${styles.cards} text-center col-md-5`}
        >
          {totalRevenueYear.map((item, index) => {
            return (
              <div key={item._id}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <p>Tổng doanh số lượng đơn năm {item._id.year}</p>
                  </div>
                  <div className={`${styles.cardBody} fw-bold`}>
                    <p>{item.totalBill}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </DashboardSummaryCards>
      </div>
      {/* hiển thị doanh thu theo tuần*/}
      <div className="row mt-3">
        <div className="col-md-6">
          <p className="text-center">Thống kê tháng này</p>
          <div>
            <ChartColum data={revenueWeek}></ChartColum>
          </div>
        </div>
        <div className="col-md-6">
          <p className="text-center">Thống kê tuần này</p>
          <div>
            <ChartColum data={revenueDay}></ChartColum>
          </div>
          </div>
      </div>
      <div className={`${styles.container} mt-3`}>
        {/* hiển thị số lượng sản phẩm được bán nhiều nhất */}
        <div className="">
          <DashboardSummaryCards>
            <h4>Top 10 sản phẩm bán chạy</h4>
            <table className="table">
              <thead className="table-success">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">số lượng bán chạy</th>
                  <th scope="col">tổng doanh thu cho mỗi sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {Top10Product.map((item, index) => {
                  const totalRevenue = item.totalRevenue.$numberDecimal;
                  const totalRevenueFormatted = Number.parseFloat(
                    totalRevenue
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  });
                  return (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.totalQuantity}</td>
                      <td>{totalRevenueFormatted}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DashboardSummaryCards>
        </div>
      </div>
    </div>
  );
}

export default ManageAdmin;
