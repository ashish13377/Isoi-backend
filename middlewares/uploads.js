const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null , "./uploads/")
    },
    filename : function(req,file,cb){
        cb(null, "ISOI" + "-" + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
    storage : storage,
})

module.exports = upload.single("myFile");