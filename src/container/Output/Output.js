import React from 'react';
import Plot from 'react-plotly.js';
import "./Output.css"

import OutputPropTypes from "./Output.propTypes"

const Output = ({ plotData }) => {

  return (
    <div className="outputPlot">
      <Plot
        data={plotData}
        layout={{
          width: 1500,
          height: 1200,
          xaxis: { showgrid: false, zeroline: false, visible: false },
          yaxis: { showgrid: false, zeroline: false, visible: false }
        }}
      />
    </div>
  )
}

Output.propTypes = OutputPropTypes

export default Output