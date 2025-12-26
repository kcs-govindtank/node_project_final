import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder if it doesn't exist
const uploadDir = "uploads/events";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed MIME types
const FILE_TYPE_MAP: { [key: string]: string } = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "video/mp4": "mp4",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },
  filename: (_, file, cb) => {
    const ext = FILE_TYPE_MAP[file.mimetype];
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueName}.${ext}`);
  },
});

const fileFilter = (
  _: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (FILE_TYPE_MAP[file.mimetype]) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images, videos, and PDF files are allowed."
      )
    );
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
