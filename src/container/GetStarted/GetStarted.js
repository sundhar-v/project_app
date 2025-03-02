import React from 'react';
import "./GetStarted.css"

import JSONImage from '../../assets/json-file.png'

import SampleData1 from '../../assets/sample_data1.json'
import SampleData2 from '../../assets/sample_data2.json'
import SampleData3 from '../../assets/sample_data3.json'

const GetStarted = () => {
  const downloadFile = (file, fileName) => {
    let a = document.createElement('a');
    const contentType = "application/json;charset=utf-8;";
    a.download = fileName;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(file));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className='getStarted'>
      <h4>Sample Data Sets</h4>
      <div className="tile files">
        <div className="tile-icon">
          <img src={JSONImage} alt="JSON" height={"50px"} width={"50px"} />
        </div>
        <div className="tile-content">
          <p className="tile-title"><b>Data Set 1</b></p>
          <p className="tile-subtitle">
            Data defined for 23 Customers and all additional variables.
          </p>
        </div>
        <div className="tile-action">
          <button
            className="btn btn-primary"
            onClick={() => downloadFile(SampleData1, "sample_data1.json")}
          >
            {"Download"}
          </button>
        </div>
      </div>
      <div className="tile files">
        <div className="tile-icon">
          <img src={JSONImage} alt="JSON" height={"50px"} width={"50px"} />
        </div>
        <div className="tile-content">
          <p className="tile-title"><b>Data Set 2</b></p>
          <p className="tile-subtitle">
            Data defined for 100 Customers and all additional variables.
          </p>
        </div>
        <div className="tile-action">
          <button
            className="btn btn-primary"
            onClick={() => downloadFile(SampleData2, "sample_data2.json")}
          >
            {"Download"}
          </button>
        </div>
      </div>
      <div className="tile files">
        <div className="tile-icon">
          <img src={JSONImage} alt="JSON" height={"50px"} width={"50px"} />
        </div>
        <div className="tile-content">
          <p className="tile-title"><b>Data Set 3</b></p>
          <p className="tile-subtitle">
            Data defined for 7 Customers.
          </p>
        </div>
        <div className="tile-action">
          <button
            className="btn btn-primary"
            onClick={() => downloadFile(SampleData3, "sample_data3.json")}
          >
            {"Download"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetStarted