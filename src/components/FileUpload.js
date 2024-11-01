import React, { useState } from 'react';
import { handleFileChangeService } from '../services/dataCombineService';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
  const [fileInputs, setFileInputs] = useState(['']);
  const [error, setError] = useState('');

  const handleFileChange = async (index, event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFileInputs = [...fileInputs];

    newFileInputs[index] = selectedFiles;
    setFileInputs(newFileInputs);
    setError('');
  };

  const handleAddInput = () => {
    setFileInputs((prev) => [...prev, '']);
  };

  const handleRemoveInput = (index) => {
    setFileInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCombineData = async () => {
    const combinedFiles = fileInputs.flat();
    if (combinedFiles.length === 0) {
      setError('Please select at least one file before combining.');
      return;
    }
    setError('');
    try {
      const combinedData = await handleFileChangeService(combinedFiles);
      onFileUpload(combinedData);
    } catch (err) {
      setError(err.message === 'Invalid file type'
        ? 'Please upload valid files (.txt, .docx, .pdf, or .xlsx).'
        : 'Failed to combine data. Please try again.');
    }
  };

  return (
    <div className="file-upload-container">
      {fileInputs.map((_, index) => (
        <div key={index} className="file-input-group">
          <input
            className="file-input"
            type="file"
            accept=".txt, .docx, .pdf, .xlsx"
            multiple
            onChange={(e) => handleFileChange(index, e)}
          />
          <button onClick={handleAddInput} className="add-button">+</button>
          <button 
            onClick={() => handleRemoveInput(index)} 
            className="remove-button" 
            disabled={fileInputs.length === 1}
          >X</button>
        </div>
      ))}
      <button onClick={handleCombineData}>Combine Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
