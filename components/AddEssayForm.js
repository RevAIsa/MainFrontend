import React, { useState, useRef } from 'react';

const AddEssayForm = ({ onCloseForm }) => {
  const [essayTitle, setEssayTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [essay, setEssay] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // uncomment the following code if we want to upload files instead of pasting the essay
  // also uncomment the file upload portion of the form below.
  // const fileInputRef = useRef(null);

  // const handleFileButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileUpload = (e) => {
  //   const uploadedFile = e.target.files[0];
  //   setFile(uploadedFile);
  //   setFileName(uploadedFile.name);
  // };

  return (
    <div className="essay-form">
      <div className="form-field">
        <label htmlFor="essay-title">Essay Title:</label>
        <textarea
          type="text"
          id="essay-title"
          value={essayTitle}
          onChange={(e) => setEssayTitle(e.target.value)}
          placeholder='Give your essay a title.'
        ></textarea>
      </div>
      <div className="form-field">
        <label htmlFor="essay-prompt">Prompt:</label>
        <textarea
          id="essay-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="taller-prompt"
          placeholder='Paste the essay prompt here.'
        ></textarea>
      </div>
      <div className="form-field">
        <label htmlFor="essay-string">Essay:</label>
        <textarea
          id="essay-string"
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          className="taller-essay" // Add a custom class for styling if needed
          placeholder="Paste your essay here."
        ></textarea>
      </div>
      {/* Uncomment the following code to add a styled file upload button to the form. Also uncomment code above.*/}
      {/* <div className="form-field">
        <label htmlFor="upload-file">Upload File:</label>
        <div className="custom-file-upload">
          <span onClick={handleFileButtonClick}>Choose File</span>
          <input
            type="file"
            id="upload-file"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </div>
      </div> */}
      {/* Remove the submit button */}
    </div>
  );
};

export default AddEssayForm;


