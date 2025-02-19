import React from "react";
import "./Steps.css"
import StepsPropTypes from "./Steps.propTypes";

import ClickMe from "../../assets/click_me.jpg"

import { stepValues } from "../../utils/constants";

const Steps = ({stepNumber, setCurrentStep, setInputDataGenerated}) => {
  const navigateStep = (clicked) => {
    if (stepNumber === 1 && clicked !== stepNumber) {
      setCurrentStep(clicked)
    }
    else if (clicked < stepNumber) {
      setCurrentStep(clicked)
    }
    if (clicked === 0) {
      setInputDataGenerated(false)
    }
  }

  return <div className="toparea">
    <ul className="step">
      {stepNumber === 1 
        ? stepValues.map((value, i) => ( 
          <li className={"step-item"} key={i}>
            <a
              className={i === 1 ? "c-auto" : "c-hand"}
              data-tooltip={value}
              onClick={() => navigateStep(i)}
            >
              {value}
              <br />
              {i === 2 ? <img src={ClickMe} height={"30px"} width={"60px"} alt={"Click me"}/> : ""}
            </a>
          </li>
        ))
        : stepValues.map((value, i) => (
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