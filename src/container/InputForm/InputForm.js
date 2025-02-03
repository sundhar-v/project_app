import React from 'react';

import InputFormPropTypes from './InputForm.propTypes'

const InputForm = ({
  setCurrentStep,
  setExcelInputMode,
  numberOfCustomers,
  setNumberOfCustomers,
  vehicleCapacity,
  setVehicleCapacity
}) => {
  const generateData = () => {
    setCurrentStep(1)
    setExcelInputMode(false)
  }

  return <div className="card">
    <div className="card-header">
      <div className="card-title h5">Enter Your Input</div>
    </div>
    <div className="card-body p-centered">
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-6 col-sm-12 text-left">
            <label className="form-label" htmlFor="customers">Customers</label>
          </div>
          <div className="col-6 col-sm-12">
            <input
              className="form-input"
              type="number"
              id="customers"
              placeholder="e.g: 23"
              min={1}
              max={100}
              value={numberOfCustomers}
              onChange={(e) => setNumberOfCustomers(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-6 col-sm-12 text-left">
            <label className="form-label" htmlFor="customers">Vehicle Capacity</label>
          </div>
          <div className="col-6 col-sm-12">
            <input
              className="form-input"
              type="number"
              id="vehiclecap"
              placeholder="e.g: 100"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
    <div className="card-footer">
      <button 
        className="btn btn-primary"
        onClick={generateData}
      >
        {"Generate Random Data"}
      </button>
    </div>
  </div>
}

InputForm.propTypes = InputFormPropTypes

export default InputForm