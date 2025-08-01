import ShowOrder from "../../../components/admin/OrderPage/ShowOrder";

const OrderPage = () => {
  return (
    <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
      <h3 className="text-center mb-3">Quản lý đơn hàng</h3>
      <ShowOrder />
    </div>
  );
};

export default OrderPage;
