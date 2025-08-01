import RecycleTypeProduct from "../../../components/admin/RecyTypeProduct/RecycleTypeProduct";

const RecycleBinProductPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h3 className="text-center mb-3">Thùng rác loai sản phẩm</h3>
      <RecycleTypeProduct />
    </div>
  );
}
export default RecycleBinProductPage;