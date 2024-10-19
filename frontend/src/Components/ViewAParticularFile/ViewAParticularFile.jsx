import React from 'react';
import { useLocation } from 'react-router-dom';

function ViewAParticularFile() {
    const location = useLocation();
    const file = location.state?.file; // Destructure the file from location state

    // If the file is not provided, show an error message
    if (!file) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">File Details</h1>
                <p>⚠️ File is not provided.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">File Details</h1>
            <h2 className="text-lg font-semibold">{file.filename}</h2>
            <p className="text-gray-700">{file.filePath}</p>
            {/* Ensure the filePath is a publicly accessible URL */}
            <a
                href={file.filePath} // This should be a valid URL to avoid errors
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                View File
            </a>
        </div>
    );
}

export default ViewAParticularFile;
