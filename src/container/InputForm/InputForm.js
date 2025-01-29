import React from 'react';

const InputForm = () => {
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
            <input className="form-input" type="number" id="customers" placeholder="e.g: 23" min={1} max={100}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-6 col-sm-12 text-left">
            <label className="form-label" htmlFor="customers">Vehicle Capacity</label>
          </div>
          <div className="col-6 col-sm-12">
            <input className="form-input" type="number" id="customers" placeholder="e.g: 100" />
          </div>
        </div>
      </form>
    </div>
    <div className="card-footer">
      <button className="btn btn-primary">
        {"Generate Random Data"}
      </button>
    </div>
  </div>
}

export default InputForm