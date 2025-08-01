// src/components/admin/product/CreateProduct.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Box, Input } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import style from "./CreateProduct.module.css";
import api from "../../../api/axios";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    discount: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/typeProduct");
        setCategories(res.data.typeProducts);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key === "category" ? "typeProductId" : key, value);
      });
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await api.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tạo sản phẩm thành công!");
      navigate("/quan-tri/san-pham");
    } catch (error) {
      console.error("Lỗi tạo sản phẩm:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Thêm Sản Phẩm
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Tên Sản Phẩm" name="name" value={product.name} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField select fullWidth label="Danh mục" name="category" value={product.category} onChange={handleChange}>
              {categories.map((item) => (
                <MenuItem key={item._id} value={item._id} className={style.list}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Giá" name="price" type="number" value={product.price} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="% Giảm giá" name="discount" type="number" value={product.discount} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Số lượng" name="quantity" type="number" value={product.quantity} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Mô Tả</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={product.description}
              onChange={(event, editor) => {
                setProduct((prev) => ({ ...prev, description: editor.getData() }));
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Ảnh sản phẩm</Typography>
            <Input type="file" accept="image/*" inputProps={{ multiple: true }} onChange={handleImageChange} />
            {images.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2">Các file đã chọn:</Typography>
                <ul>
                  {Array.from(images).map((img, idx) => (
                    <li key={idx}>{img.name}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Thêm Sản Phẩm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateProduct;
