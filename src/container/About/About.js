import React from 'react';
import "./About.css"

import LinkedIn from "../../assets/linkedin-logo.webp"
import GitHub from "../../assets/github-logo.png"
import Ira from "../../assets/p23ira.JPG"
import Sundhar from "../../assets/p23Sundhar V-min.JPG"

const About = () => {
  return (
    <div className='container about'>
      <div className='columns'>
        <div className="column col-6">
          <div className='card individual'>
            <div className="card-image photo">
              <img src={Ira} className="img-responsive photo" alt="Ira"/>
            </div>
            <div className="card-header">
              <div className="card-title h5">{"Ira Kathane"}</div>
              <div className="card-subtitle text-gray">{"PGP Class of 2025"}</div>
            </div>
            <div className="card-body">
              <a
                href={"https://www.linkedin.com/in/ira-kathane/"}
                target='_blank'
                rel="noreferrer"
              >
                <div className="chip">
                  <img src={LinkedIn} className="avatar avatar-sm" />
                  {"LinkedIn"}
                </div>
              </a>
              <a
                href={"https://github.com/irakathane"}
                target='_blank'
                rel="noreferrer"
              >
                <div className="chip">
                  <img src={GitHub} className="avatar avatar-sm" />
                  {"GitHub"}
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="column col-6">
          <div className='card individual'>
            <div className="card-image">
              <img src={Sundhar} className="img-responsive photo" alt="Sundhar"/>
            </div>
            <div className="card-header">
              <div className="card-title h5">{"Sundhar V"}</div>
              <div className="card-subtitle text-gray">{"PGP Class of 2025"}</div>
            </div>
            <div className="card-body">
              <a
                href={"https://www.linkedin.com/in/sundharvel/"}
                target='_blank'
                rel="noreferrer"
              >
                <div className="chip">
                  <img src={LinkedIn} className="avatar avatar-sm" />
                  {"LinkedIn"}
                </div>
              </a>
              <a
                href={"https://github.com/sundhar-v"}
                target='_blank'
                rel="noreferrer"
              >
                <div className="chip">
                  <img src={GitHub} className="avatar avatar-sm" />
                  {"GitHub"}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About