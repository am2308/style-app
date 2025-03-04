const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

dotenv.config(); // Load environment variables

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer-S3 Configuration: Upload files directly to S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // Grant public read access (optional, depends on your requirements)
    key: (req, file, cb) => {
      // Generate unique key for S3 object
      const uniqueKey = `uploads/${Date.now()}_${file.originalname}`;
      cb(null, uniqueKey);
    },
  }),
});

// Controller: Upload multiple files
const uploadImage = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    // Extract uploaded file details (handled by multer-s3)
    const fileUrls = req.files.map((file) => file.location); // 'file.location' contains the S3 file URL

    console.log("Uploaded file URLs:", fileUrls);

    res.status(200).json({
      message: "Files uploaded successfully",
      fileUrls: fileUrls,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};
module.exports = { upload, uploadImage };

  
