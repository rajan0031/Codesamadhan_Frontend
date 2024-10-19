const express = require("express");

const router = express.Router();


// controller se function ko le aaya 
const { uploadFileApi, getAllFilesFromTheBackend, viewAParticularFile } = require("../../Controllers/uploadFileController/uploadFileController")

// backend  api for the uploadling the file 


router.post("/uploadFileApi", uploadFileApi);


// getting alert, the files api routes

router.post("/getAllFilesFromTheBackend", getAllFilesFromTheBackend);


// this a route for the viewing a file

router.post("/viewAParticularFile", viewAParticularFile);




module.exports = router;


// getAllFilesFromTheBackend
// viewAParticularFile