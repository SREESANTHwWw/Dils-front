// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");






// const fs = require("fs");

// const app = express();

// // MongoDB connection
// mongoose
//   .connect(
//     "mongodb+srv://sujithkumarsk175:7I7klmtDiBKsV6od@cluster0.l48si.mongodb.net/?retryWrites=true&w=majoritppName=Cluster0"
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// const fileSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   filepath: { type: String, required: true },
//   fileUrl: { type: String, required: true },
//   uploadedAt: { type: Date, default: Date.now },
// });

// const File = mongoose.model("File", fileSchema);

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, ${Date.now()}-${file.originalname});
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const fileData = new File({
//       filename: req.file.originalname,
//       filepath: req.file.path,
//       fileUrl: http://localhost:5000/uploads/${req.file.filename},
//     });

//     await fileData.save();

//     res.status(200).json({
//       message: "File uploaded successfully",
//       file: fileData,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "File upload failed",
//       error: err.message,
//     });
//   }
// });

// app.get("/file/:id", async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id); //pass file id means _id

//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     res.status(200).json({
//       filename: file.filename,
//       fileUrl: file.fileUrl,
//       uploadedAt: file.uploadedAt,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving file", error: err.message });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(Server running on http://localhost:${PORT});
// });


// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [uploadedFileUrl, setUploadedFileUrl] = useState("");
//   const [fileMetadata, setFileMetadata] = useState(null);
//   const [fileId, setFileId] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMessage(response.data.message);
//       setUploadedFileUrl(response.data.file.fileUrl);
//       setFileMetadata(response.data.file);
//       setFileId(response.data.file._id);
//     } catch (error) {
//       setMessage("File upload failed.");
//     }
//   };

//   const fetchFileMetadata = async () => {
//     try {
//       const response = await axios.get(http://localhost:5000/file/${fileId});
//       setFileMetadata(response.data);
//       setUploadedFileUrl(response.data.fileUrl);
//     } catch (error) {
//       setMessage("Error retrieving file metadata.");
//     }
//   };

//   return (
//     <div className="App">
//       <h1>File Upload with MongoDB</h1>
//       <form onSubmit={handleFileUpload}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {message && <p>{message}</p>}
//       {uploadedFileUrl && (
//         <div>
//           <p>Uploaded File:</p>
//           <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
//             {uploadedFileUrl}
//           </a>
//           <div>
//             <h3>File Metadata</h3>
//             <p>
//               <strong>Filename:</strong> {fileMetadata.filename}
//             </p>
//             <p>
//               <strong>File URL:</strong> {fileMetadata.fileUrl}
//             </p>
//             <p>
//               <strong>Uploaded At:</strong>{" "}
//               {new Date(fileMetadata.uploadedAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       )}
//       {fileId && (
//         <div>
//           <button onClick={fetchFileMetadata}>Get File Metadata from DB</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
