import React from 'react';

import { isValidFileUploaded } from '../../utils/functions';

import UploadDataPropTypes from './UploadData.propTypes';

const UploadData = ({ 
  setCurrentStep,
  setJSONInputMode,
  setInputFile,
  inputFileValidity,
  setInputFileValidity,
  setToastText,
  setToastStatus,
  fileInputRef
}) => {
  const showErrorToast = () => {
    setToastText("Unsupported file format. Upload JSON files.")
    setToastStatus(true)
  }

  const onUploadFile = (e) => {
    if(e.target.files.length < 1){
      return;
    }
    const file = e.target.files[0];
    if(isValidFileUploaded(file)){
      setInputFile(file)
      setInputFileValidity(true)
    }else{
      showErrorToast()
    }
  }

  const proceedToPreview = () => {
    if (inputFileValidity) {
      setCurrentStep(1)
      setJSONInputMode(true)
    } else {
      showErrorToast()
    }
  }

  return <div className="card">
    <div className="card-header">
      <div className="card-title h5">Upload File</div>
    </div>
    <div className="card-body">
      <form className="form-horizontal">
        <div className="col-9 col-sm-12 p-centered">
          <input 
            className="form-input"
            type="file"
            id="file"
            ref={fileInputRef}
            onChange={onUploadFile}
          />
        </div>
      </form>
    </div>
    <div className="card-footer">
      <button
        className={inputFileValidity ? "btn btn-primary" : "btn btn-primary disabled"}
        onClick={proceedToPreview}
      >
        {"Click to Proceed"}
      </button>
    </div>
  </div>
}

UploadData.propTypes = UploadDataPropTypes

export default UploadData