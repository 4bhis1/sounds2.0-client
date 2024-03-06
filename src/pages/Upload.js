import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const handleUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:4001/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("File uploaded successfully");
  } catch (err) {
    console.log(">> err while handling upload", err);
  }
};

function Upload() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellowgreen",
      }}
    >
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="audio/mp3"
          onChange={(e) => {
            handleUpload(e.target.files[0]);
          }}
        />
      </Button>
    </div>
  );
}

export default Upload;
