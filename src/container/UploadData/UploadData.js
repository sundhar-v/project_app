import React from 'react';

const UploadData = () => {
  return <div className="card">
    <div className="card-header">
      <div className="card-title h5">Upload File</div>
    </div>
    <div className="card-body">
      <form className="form-horizontal">
        <div className="col-9 col-sm-12 p-centered">
          <input className="form-input" type="file" id="file" />
        </div>
      </form>
    </div>
    <div className="card-footer">
      <button className="btn btn-primary">
        {"Click to Proceed"}
      </button>
    </div>
  </div>
}

export default UploadData