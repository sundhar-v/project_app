import React from 'react';
import "./Toast.css"

import ToastPropTypes from './Toast.propTypes';

const Toast = ({ text, setToastStatus }) => {
  return <div className="toast toast-error floater">
    <button className="btn btn-clear float-right" onClick={() => setToastStatus(false)}></button>
    {text}
  </div>
}

Toast.propTypes = ToastPropTypes

export default Toast;