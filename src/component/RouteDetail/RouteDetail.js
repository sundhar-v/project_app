import React from 'react';
import "./RouteDetail.css"

import RouteDetailPropTypes from './RouteDetail.propTypes';

const RouteDetail = ({routeData = {}, currentRoute}) => {
  return (
    Object.keys(routeData).length 
      ? <>
        <div className="tile tile-centered routeHeader">
          <div className="tile-content">
            <small className="tile-subtitle text-error">{"Route " + currentRoute}</small>
            <div className="h5 text-primary">
              {routeData["routeName"].join(" -> ")}
            </div>
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
        <div className="timelineWrapper">
          <ul className="timeline">
            <li className="timelineItem">
              <div className="timelineHeading">
                {"Started from Depot at "+routeData["depotData"]["start"]+ " hrs"}
              </div>
            </li>
            {routeData["nodeData"].map(node => (
              <li className="timelineItem" key={node["nodeName"]}>
                <div className="timelineHeading">
                  {"Arrived on Customer "+node["nodeName"]+" at "+node["arrivalTime"]+" hrs"}
                </div>
                <p className="timelineContent">
                  {"Fresh Units in Vehicle: "+node["freshUnits"]}<br />
                  {"Stale Units in Vehicle: "+node["staleUnits"]}<br />
                  {"Delivery for Customer: "+node["nodeDemand"]}<br />
                  {"Pickup from Customer: "+node["nodePickup"]}
                </p>
              </li>
            ))}
            <li className="timelineItem">
              <div className="timelineHeading">
                {"Arrived back to Depot at "+routeData["depotData"]["end"]+ " hrs"}
              </div>
            </li>
          </ul>
        </div>
      </>
      : <></>
  )
}

RouteDetail.propTypes = RouteDetailPropTypes

export default RouteDetail