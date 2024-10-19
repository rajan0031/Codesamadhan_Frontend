import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllFilesFromTheBackend } from '../../utils/FileUpload/FileUpload';
import { AiOutlineEye, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AllFilesCollection() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.post(getAllFilesFromTheBackend, {
                    data: {},
                });

                setFiles(response.data.files);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch files.');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const handleViewFile = (file) => {
        navigate("/ViewAParticularFile", {
            state: {
                file: file,
            }
        });
    };

    const handleDownloadFile = (file) => {
        // download 
    };

    const handleDeleteOfFile = (file) => {
        // Implement delete functionality here
    };

    if (loading) return <div>📂 Loading files...</div>;
    if (error) return <div>⚠️ {error}</div>;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">📄 All Files Collection</h1>
            {files.length === 0 ? (
                <p className="text-lg text-gray-500">No files available. 😕</p>
            ) : (
                <ul className="space-y-4">
                    {files.map((file) => (
                        <li key={file.filename} className="p-4 bg-white shadow-md rounded-md flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-3 flex-1">
                                <FaFileAlt className="text-2xl text-gray-500" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{file.filename}</h3>
                                    <p className="text-sm text-gray-500 truncate">{file.filePath}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 sm:w-auto w-full">
                                {/* View Button */}
                                <button
                                    onClick={() => handleViewFile(file)}
                                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition w-full sm:w-auto"
                                >
                                    <AiOutlineEye className="mr-2" /> View File
                                </button>
                                {/* Download Button */}
                                <button
                                    onClick={() => handleDownloadFile(file)}
                                    className="flex items-center justify-center px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition w-full sm:w-auto"
                                >
                                    <AiOutlineDownload className="mr-2" /> Download
                                </button>
                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteOfFile(file)}
                                    className="flex items-center justify-center px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition w-full sm:w-auto"
                                >
                                    <AiOutlineDelete className="mr-2" /> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AllFilesCollection;
