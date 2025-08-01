import RecycleProduct from "../../../components/admin/RecycleBinProduct";

const RecycleBinProductPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h3 className="text-center mb-3">Thùng rác sản phẩm</h3>
      <RecycleProduct />
    </div>
  );
}
export default RecycleBinProductPage;