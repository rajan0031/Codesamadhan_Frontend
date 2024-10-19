


// start of the controller for the file upload 



const multer = require('multer');
const path = require('path');

const fs = require('fs');

// const data =require("")







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

    const uploadDirectory = path.resolve(__dirname, '../uploads');


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



// start of the controller for the getting all the files from teh backend 



// Controller to get all files

module.exports.getAllFilesFromTheBackend = (req, res) => {


    console.log("hello controller");


    const uploadDirectory = path.resolve(__dirname, '../../uploads'); // Ensure absolute path

    console.log(uploadDirectory);

    // Check if directory exists, create if it doesn't
    if (!fs.existsSync(uploadDirectory)) {
        return res.status(400).json({ success: false, message: 'Uploads directory does not exist.' });
    }

    fs.readdir(uploadDirectory, (err, files) => {
        if (err) {
            console.error('Error reading the files:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.', error: err.message });
        }

        if (!files.length) {
            return res.status(200).json({ success: true, message: 'No files found.', files: [] });
        }

        const fileList = files.map((file) => ({
            filename: file,
            filePath: `${uploadDirectory}/${file}`, // Path to each file
        }));

        res.status(200).json({ success: true, files: fileList });
    });
};


//e nd of the controllers


// start of the controller to view a particular file

module.exports.viewAParticularFile = async (req, res) => {

    try {

        console.log(req.body);

    } catch (err) {
        console.log(err);
    }

    // try {
    //     // Accessing the specific file from the request body
    //     const { file } = req.body;

    //     // Log the entire body to debug
    //     console.log("Request Body:", req.body);
    //     console.log("File Name:", file);

    //     // Ensure the file name is provided
    //     if (!file) {
    //         return res.status(400).json({ success: false, message: 'File name is required.' });
    //     }

    //     // Resolve the path to the uploads directory and the specific file
    //     const uploadDirectory = path.resolve(__dirname, '../../uploads');
    //     const filePath = path.join(uploadDirectory, file);

    //     // Check if the file exists
    //     if (!fs.existsSync(filePath)) {
    //         return res.status(404).json({ success: false, message: 'File not found.' });
    //     }

    //     // Send the file to the client
    //     res.sendFile(filePath, (err) => {
    //         if (err) {
    //             console.error('Error sending file:', err);
    //             return res.status(500).json({ success: false, message: 'Error sending file.' });
    //         }
    //     });

    // } catch (err) {
    //     console.error('Error processing file:', err);
    //     return res.status(500).json({ success: false, message: 'Internal server error.' });
    // }
}


//end of the controller to view a particular file