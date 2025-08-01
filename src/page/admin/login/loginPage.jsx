import Login from "../../../components/login/index"; // ✅ import đúng tên component

const LoginPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h3 className="text-center mb-3">Đăng nhập</h3>
      <Login /> {/* ✅ phải viết hoa khi dùng component */}
    </div>
  );
};

export default LoginPage;
