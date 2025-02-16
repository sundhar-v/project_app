import React from 'react';
import "./InputForm.css"

import InputFormPropTypes from './InputForm.propTypes'

import { timeStringToMinutes } from '../../utils/functions';
import { minimumDeliveryWindowDuration } from '../../utils/constants';

const InputForm = ({
  setCurrentStep,
  setExcelInputMode,
  numberOfCustomers,
  setNumberOfCustomers,
  vehicleCapacity,
  setVehicleCapacity,
  deliveryStart,
  setDeliveryStart,
  deliveryEnd,
  setDeliveryEnd,
  setToastText,
  setToastStatus
}) => {
  const generateData = () => {
    if (numberOfCustomers < 0 || numberOfCustomers >100) {
      setToastText("Number of Customers should be in the range 1-100")
      setToastStatus(true)
    }
    else if (vehicleCapacity <= 0 ) {
      setToastText("Vehicle Capacity should not be negative")
      setToastStatus(true)
    } else if (timeStringToMinutes(deliveryEnd)<=timeStringToMinutes(deliveryStart)) {
      setToastText("Delivery ending time should be greater than the starting time")
      setToastStatus(true)
    } else if (timeStringToMinutes(deliveryEnd)-timeStringToMinutes(deliveryStart)<minimumDeliveryWindowDuration) {
      setToastText("Minimum time window for deliveries should be greater than "+minimumDeliveryWindowDuration+" minutes")
      setToastStatus(true)
    } else {
      setCurrentStep(1)
      setExcelInputMode(false)
    }
  }

  return <div className="card">
    <div className="card-header">
      <div className="card-title h5">Enter Your Input</div>
    </div>
    <div className="card-body p-centered formContainer">
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-4 col-sm-12 text-left">
            <label className="form-label" htmlFor="customers">Customers</label>
          </div>
          <div className="col-8 col-sm-12">
            <input
              className="form-input"
              type="number"
              id="customers"
              placeholder="e.g: 23"
              min={1}
              max={100}
              value={numberOfCustomers}
              onChange={(e) => setNumberOfCustomers(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-4 col-sm-12 text-left">
            <label className="form-label" htmlFor="vehiclecap">Vehicle Capacity</label>
          </div>
          <div className="col-8 col-sm-12">
            <input
              className="form-input"
              type="number"
              id="vehiclecap"
              placeholder="e.g: 100"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-4 col-sm-12 text-left">
            <label className="form-label" htmlFor="vehiclecap">Delivery Time</label>
          </div>
          <div className="col-4 col-sm-12">
            <input
              className="form-input"
              type="time"
              id="deliveryStart"
              value={deliveryStart}
              onChange={(e) => setDeliveryStart(e.target.value)}
            />
          </div>
          <div className="col-4 col-sm-12">
            <input
              className="form-input"
              type="time"
              id="deliveryEnd"
              value={deliveryEnd}
              onChange={(e) => setDeliveryEnd(e.target.value)}
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