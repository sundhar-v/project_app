import React from 'react';
import Plot from 'react-plotly.js';
import "./Output.css"

import OutputPropTypes from "./Output.propTypes"

import { useWindowDimensions } from '../../utils/window_dimension';

const Output = ({ plotData }) => {
  const { height, width } = useWindowDimensions();
  
  return (
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
  )
}

Output.propTypes = OutputPropTypes

export default Output