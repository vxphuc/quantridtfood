// src/components/admin/banner/CreateBanner.jsx
import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import api from "../../api/axios"; // ← điều chỉnh nếu bạn dùng alias

const CreateBanner = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return alert("Vui lòng chọn ảnh trước!");
    const formData = new FormData();
    formData.append("image", imageFile);
    setUploading(true);
    try {
      await api.post("/sign-in/upload-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Tải ảnh thành công!");
      window.location.href = "/quan-tri/banner";
    } catch (error) {
      console.error("Lỗi khi upload:", error);
      alert("Tải ảnh thất bại!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Chọn ảnh
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
      </Button>

      {image && (
        <Box mt={2}>
          <Typography variant="body1">{imageName}</Typography>
          <img
            src={image}
            alt="Ảnh đã chọn"
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: 8,
              marginTop: 10,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading}
            sx={{ mt: 2 }}
          >
            {uploading ? "Đang tải lên..." : "Gửi ảnh lên server"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CreateBanner;
