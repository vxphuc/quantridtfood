// src/components/admin/type-product/CreateTypeProduct.jsx
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import api from "../../../api/axios";

const CreateTypeProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.image) data.append("image", formData.image);

      await api.post("/typeProduct/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Đã thêm loại sản phẩm thành công!");
      window.location.href = "/quan-tri/loai-san-pham";
    } catch (error) {
      console.error("Lỗi khi tạo loại sản phẩm:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 3,
          mt: 5,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Thêm Loại Sản Phẩm
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tên loại sản phẩm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Chọn Hình Ảnh
            <input
              type="file"
              accept="image/*"
              hidden
              name="image"
              onChange={handleFileChange}
            />
          </Button>

          {formData.image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Đã chọn: {formData.image.name}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Lưu
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateTypeProduct;
