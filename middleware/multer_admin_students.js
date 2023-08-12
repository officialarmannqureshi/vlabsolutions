import multer from 'multer';
import fs from 'fs';
import path from 'path';

const folderpath_students = path.join(process.cwd(), 'students-details');

if(!fs.existsSync(folderpath_students)){
  fs.mkdirSync(folderpath_students);
  console.log('Folder is created!');
}




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderpath_students);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});



const upload_student=multer({
  storage:storage,
})

export default upload_student;


