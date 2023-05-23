import React, { useState, useRef } from 'react';

const AddEssayForm = ({ onCloseForm }) => {
  const [essayTitle, setEssayTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  return (
    <div className="essay-form">
      <div className="form-field">
        <label htmlFor="essay-title">Essay Title:</label>
        <input
          type="text"
          id="essay-title"
          value={essayTitle}
          onChange={(e) => setEssayTitle(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="essay-prompt">Prompt:</label>
        <textarea
          id="essay-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="taller-prompt"
        ></textarea>
      </div>
      <div className="form-field">
        <label htmlFor="essay-file">Upload File:</label>
        <div className="custom-file-upload">
          <span onClick={handleFileButtonClick}>Choose File</span>
          <input
            type="file"
            id="essay-file"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </div>
        {fileName && <p>{fileName}</p>}
      </div>
      {/* Remove the submit button */}
    </div>
  );
};

export default AddEssayForm;


