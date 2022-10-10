const multer = require('multer');

// multer configurations
const uploadFolder = './server/images/uploads/'

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
    },
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype === ('image/jpeg' || 'image/png' || 'image/svg+xml')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: diskStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: imageFilter,
});

module.exports = { upload };
