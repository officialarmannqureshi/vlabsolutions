import multer from "multer";
const storage=multer.diskStorage({
    destination:function (req,file,cb){
            cb(null,"./uploads/");        
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname);
    }
});

const fileFilter= (req,file,cb)=>{
    if(file.mimetype === 'application/pdf'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,

});

export default upload;