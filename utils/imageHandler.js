const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./Images');
    },
    filename:(req,file,cb) => {
        var type = file.mimetype.split('/');
        var name = file.originalname.split('.');
        cb(null,`${name[0]}.${type[1]}`)
    }
});

const upload = multer({storage:storage});

module.exports = upload;