import express from "express";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import cors from "cors";
import FormData from "form-data";

const app = express();

app.use(cors({ origin: "*"}));
const upload = multer({ dest: "uploads/" });

const PINATA_KEY = "Your_Pinata_Key";
const PINATA_SECRET = "Your_Pinata_Secret";

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const data = new FormData();
    data.append("file", fs.createReadStream(file.path));

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          ...data.getHeaders(),
          pinata_api_key: PINATA_KEY,
          pinata_secret_api_key: PINATA_SECRET,
        },
      }
    );

    fs.unlinkSync(file.path);

    res.json({ cid: response.data.IpfsHash });
  } catch (error) {
    console.error("Pinata Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () =>
  console.log("✅ File Upload Server running at http://localhost:5000")
);
