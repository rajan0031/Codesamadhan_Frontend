import React, { useState } from 'react';
import axios from 'axios';
import { uploadFileApi } from '../utils/FileUpload/FileUpload';
import { useNavigate } from 'react-router-dom';

const DocumentUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filePreview, setFilePreview] = useState(null);

    const navigate = useNavigate();

    const acceptedFileTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
            setUploadStatus("");
        } else {
            setFile(null);
            setFilePreview(null);
            setUploadStatus("Invalid file type. Please select a PDF or Word document.");
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setUploadStatus("Please select a valid file first.");
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        try {
            setIsLoading(true);
            const response = await axios.post(uploadFileApi, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadStatus("File uploaded successfully!");
            setFile(null);
            setFilePreview(null);
            console.log(response);
        } catch (error) {
            setUploadStatus("Failed to upload file.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewAllFiles = () => {
        navigate("/AllFilesCollection");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Upload Document</h1>
            <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md w-96">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 p-2 border rounded-md w-full"
                    accept=".pdf,.doc,.docx"
                />

                {file && (
                    <div className="mb-4">
                        <p className="text-gray-600">Selected file: <span className="font-semibold">{file.name}</span></p>
                        {filePreview && (
                            <iframe
                                src={filePreview}
                                title="File preview"
                                className="border w-full h-40 mt-2"
                            ></iframe>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className={`bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {uploadStatus && <p className="mt-4 text-center text-red-500">{uploadStatus}</p>}

            <div className="mt-4">
                <button
                    onClick={handleViewAllFiles}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                >
                    All Docs
                </button>
            </div>
        </div>
    );
};

export default DocumentUpload;
