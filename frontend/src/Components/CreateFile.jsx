import React, { useState } from 'react';
import axios from 'axios';
import { uploadFileApi } from '../utils/FileUpload/FileUpload';

const DocumentUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filePreview, setFilePreview] = useState(null);

    // Accepted file types. here we can change the file types that we wwants from the user 
    const acceptedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    // it is simple file validation here 
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile)); // we can see files here  
            setUploadStatus("");
        } else {
            setFile(null);
            setFilePreview(null);
            setUploadStatus("Invalid file type. Please select a PDF or Word document.");
        }
    };

    // start of the form submisssion here 
    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setUploadStatus("Please select a valid file first.");
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        try {
            setIsLoading(true); // Disable the button while uploading
            const response = await axios.post(uploadFileApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },// here we are sending file , so need to mention this but if we are sending the form data no need to write anythings here ,.....
            });
            setUploadStatus("File uploaded successfully!");
            setFile(null);
            // this for clear the the input   area section 
            setFilePreview(null); // Clear file preview
            console.log(response);
        } catch (error) {
            setUploadStatus("Failed to upload file.");
        } finally {
            setIsLoading(false); // just to reset , to upload new after click
        }
    };


    // end of the  of the form submisssion here 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Upload Document</h1>
            <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md w-96">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 p-2 border rounded-md w-full"
                    accept=".pdf,.doc,.docx" // Restrict file input types
                />

                {file && (
                    <div className="mb-4">
                        <p className="text-gray-600">Selected file: {file.name}</p>
                        {filePreview && (
                            <iframe
                                src={filePreview}
                                title="File preview"
                                className="border w-full h-40"
                            ></iframe>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
        </div>
    );
};

export default DocumentUpload;
