import React from "react";
import "./Steps.css"
import StepsPropTypes from "./Steps.propTypes";

import { stepValues } from "../../utils/constants";

const Steps = ({stepNumber, setCurrentStep}) => {
  const navigateStep = (clicked) => {
    if (clicked < stepNumber) {
      setCurrentStep(clicked)
    }
  }

  return <div className="toparea">
    <ul className="step">
      {stepValues.map((value, i) => (
        <li className={stepNumber === i ? "step-item active" : "step-item"} key={i}>
          <a
            className={stepNumber > i ? "c-hand" : stepNumber < i ? "c-not-allowed" : ""}
            data-tooltip={value}
            onClick={() => navigateStep(i)}
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  </div>
}

Steps.propTypes = StepsPropTypes;

export default Steps