import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import "./Output.css"

import RouteNav from '../../component/RouteNav/RouteNav';
import RouteDetail from '../../component/RouteDetail/RouteDetail';

import OutputPropTypes from "./Output.propTypes"

import { useWindowDimensions } from '../../utils/window_dimension';

const Output = ({ plotData, tableData, finalNumberOfRoutes }) => {
  const { height, width } = useWindowDimensions();
  const [currentRoute, setCurrentRoute] = useState(1);
  
  return (
    <>
      <div className="outputPlot">
        <Plot
          data={plotData}
          layout={{
            width: 0.9*width,
            height: 0.9*height,
            xaxis: { showgrid: false, zeroline: false, visible: false },
            yaxis: { showgrid: false, zeroline: false, visible: false }
          }}
        />
      </div>
      <div className="routeNav p-centered">
        <hr />
        <RouteNav 
          finalNumberOfRoutes={finalNumberOfRoutes}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
        />
      </div>
      <div className="routeDetail">
        <RouteDetail routeData={tableData[currentRoute-1]} currentRoute={currentRoute} />
      </div>
    </>
  )
}

Output.propTypes = OutputPropTypes

export default Output