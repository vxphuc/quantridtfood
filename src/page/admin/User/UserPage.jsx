import ShowUser from "../../../components/admin/User/ShowUser";

const UserPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h3 className="text-center mb-3">Quản lý người dùng</h3>
      <ShowUser />
    </div>
  );
}

export default UserPage;