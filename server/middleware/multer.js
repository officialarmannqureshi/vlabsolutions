import multer from 'multer';
import fs from 'fs';
import path from 'path';

const folderpath = path.join(process.cwd(), 'assignments');

if (!fs.existsSync(folderpath)) {
  fs.mkdirSync(folderpath);
  console.log('Folder is created!');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderpath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
