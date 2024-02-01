import fs from "fs";
import multer from "multer";
import path from "path";

const folderpath = path.join(process.cwd(), "../client/public/assignments");
const folderpath_students = path.join(process.cwd(), "students-details");

if (!fs.existsSync(folderpath_students)) {
  fs.mkdirSync(folderpath_students);
  console.log("Folder is created!");
}
if (!fs.existsSync(folderpath)) {
  fs.mkdirSync(folderpath);
  console.log("Folder is created!");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderpath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storage_students = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderpath_students);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const upload_student = multer({
  storage: storage_students,
});

export default upload;
