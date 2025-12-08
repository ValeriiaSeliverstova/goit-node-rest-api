import multer from "multer";
import path from "path";
const tempDir = path.resolve("temp");
import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5, // 5 MB
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return cb(HttpError(400, ".exe files are not allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
