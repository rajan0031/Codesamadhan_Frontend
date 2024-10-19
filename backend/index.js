const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');



const app = express();
app.use(cors());// for the inter server communication 


const FileUploadRoutes = require("./Routes/FileUpload/FileUpload");




app.use("/", FileUploadRoutes);

// for the testing the backend purpose
app.get("/", (req, res) => {
    res.send("hello from the backend 💘")
});



// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


