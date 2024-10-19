


// start of the controller for the file upload 



const multer = require('multer');
const path = require('path');


// a multer package used for the storing the files at the backend end in a folder , jiska name upload we can give ....

const storage = multer.diskStorage({
    // file save destinations
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // this is for making the uniquiness of the file name for searching and finding in efficinent way 
    // matlab we can find easily 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // here we can defile that what types of files the user can upload thik hai!
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and DOC/DOCX files are allowed.'), false);
    }
};// names is setting unique

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // here we can cjage limts 
    fileFilter: fileFilter
}).single('document');// this function will upld the file 


// belo is the file 
// jaha we are able to get the ata from the vackend backend and all like we do for the fom data 

module.exports.uploadFileApi = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false, message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        try {
            const filePath = req.file.path;
            const fileName = req.file.filename;


            return res.status(200).json({
                success: true,
                message: 'File uploaded successfully!',
                fileName: fileName,
                filePath: filePath
            });

        } catch (err) {
            console.error('Error handling file upload:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    });
};


// end of the  of the controller for the file upload 
