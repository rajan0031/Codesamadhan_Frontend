const express = require("express");

const router = express.Router();

const { uploadFileApi } = require("../../Controllers/uploadFileController/uploadFileController")

router.post("/uploadFileApi", uploadFileApi);

module.exports = router;