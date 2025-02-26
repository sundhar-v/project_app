import React from 'react';
import "./RouteDetail.css"

import RouteDetailPropTypes from './RouteDetail.propTypes';

const RouteDetail = ({routeData, currentRoute}) => {
  console.log(routeData)
  return (
    <>
      <div className="tile tile-centered routeHeader">
        <div className="tile-content">
          <small className="tile-subtitle text-error">{"Route " + currentRoute}</small>
          <div className="h5 text-primary">{routeData["routeName"].join(" -> ")}</div>
        </div>
      </div>
      <div className="container routeSubHeader">
        <div className="columns">
          <div className="column col-xs-4">
            <div className="tile tile-centered">
              <div className="tile-content">
                <div className="h5 text-success">{"Route Cost"}</div>
                <div className="h6">{Math.round(routeData["routeCost"])}</div>
              </div>
            </div>
          </div>
          <div className="column col-xs-4">
            <div className="tile tile-centered">
              <div className="tile-content">
                <div className="h5 text-success">{"Total Demand"}</div>
                <div className="h6">{routeData["routeDemand"]}</div>
              </div>
            </div>
          </div>
          <div className="column col-xs-4">
            <div className="tile tile-centered">
              <div className="tile-content">
                <div className="h5 text-success">{"Total Pickup"}</div>
                <div className="h6">{routeData["routePickup"]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

RouteDetail.propTypes = RouteDetailPropTypes

export default RouteDetail