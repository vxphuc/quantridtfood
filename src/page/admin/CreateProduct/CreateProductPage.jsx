import CreateProduct from "../../../components/admin/CreateProduct/CreateProduct";

const CreateProductPage = () => {
    return (
        <div className="container mt-4" style={{backgroundColor: 'white', padding: '10px'}}>
        <h2 style={{marginLeft: "20px"}}>Trang tạo sản phẩm</h2>
        <CreateProduct />
        </div>
    );
    }
export default CreateProductPage;