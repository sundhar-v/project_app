import React from "react";
import "./Steps.css"
import StepsPropTypes from "./Steps.propTypes";

import { stepValues } from "../../utils/constants";

const Steps = ({stepNumber}) => {
  return <div className="toparea">
    <ul className="step">
      {stepValues.map((value, i) => (
        <li className={stepNumber === i ? "step-item active" : "step-item"} key={i}>
          <a className="tooltip" data-tooltip={value}>
            {value}
          </a>
        </li>
      ))}
    </ul>
  </div>
}

Steps.propTypes = StepsPropTypes;

export default Steps