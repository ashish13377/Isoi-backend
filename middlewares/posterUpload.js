const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null , "./uploads/poster/")
    },
    filename : function(req,file,cb){
        cb(null, "ISOI" + "-" + "Poster" + "-" + Date.now() + path.extname(file.originalname));
    }
})

// const fileFilter = (req, file, cb) => {
//     cb(null, true);
// };

const posterUpload = multer({
    storage : storage,
})

module.exports = posterUpload.single("myFile");