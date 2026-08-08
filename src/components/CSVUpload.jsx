import { useState, useRef } from "react";
import API from "../services/api";

function CSVUpload() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await API.post(
        "/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      alert("CSV uploaded successfully!");

    } catch (error) {

      console.error(error);

      setMessage("Upload failed");

    }
  };

  return (

    <div
      className="
      backdrop-blur-xl
      bg-white/10
      border border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >

      <h2 className="text-3xl font-bold text-white mb-6">
        Upload Agricultural Dataset
      </h2>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={(e) => {

          const selectedFile = e.target.files[0];

          if (selectedFile) {
            setFile(selectedFile);
          }

        }}
        className="hidden"
      />

      <button
        onClick={handleFileSelect}
        className="
        bg-blue-500
        hover:bg-blue-400
        text-white
        font-bold
        py-3
        px-8
        rounded-xl
        transition
        mr-4
        "
      >
        📁 Select CSV File
      </button>

      {file && (

        <p className="text-green-400 mt-4 mb-6">
          ✅ {file.name} selected
        </p>

      )}

      <button
        onClick={handleUpload}
        className="
        bg-green-500
        hover:bg-green-400
        text-black
        font-bold
        py-3
        px-8
        rounded-xl
        transition
        "
      >
        Upload CSV
      </button>

      {message && (

        <p className="text-green-400 mt-6">
          {message}
        </p>

      )}

    </div>
  );
}

export default CSVUpload;