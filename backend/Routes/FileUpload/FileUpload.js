const express = require("express");

const router = express.Router();


// controller se function ko le aaya 
const { uploadFileApi } = require("../../Controllers/uploadFileController/uploadFileController")

// backend  api for the uploadling the file 


router.post("/uploadFileApi", uploadFileApi);

module.exports = router;