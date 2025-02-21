import React from 'react';
import Plot from 'react-plotly.js';
import "./InputPreview.css"

import InputPreviewPropTypes from './InputPreview.propTypes'

import { useWindowDimensions } from '../../utils/window_dimension';

/* eslint-disable */
const InputPreview = ({ inputData = {} }) => {
  const { height, width } = useWindowDimensions();
  
  return Object.keys(inputData).length 
    ? <div className="plotarea">
      <Plot
        data={[
          {
            x: [inputData.depot.x],
            y: [inputData.depot.y],
            type: 'scatter',
            mode: 'markers+text',
            showlegend: false,
            text: "Depot",
            marker: { size: 44, color: '#ffb700', symbol: 'octagon' },
            textfont: {color: '#000', family: 'SUSE'},
            hoverlabel: { font: {family: 'SUSE'} },
            hovertemplate: "(x, y): (%{x}, %{y}) <extra></extra>"
          }, {
          x: inputData.xCoords,
          y: inputData.yCoords,
          type: 'scatter',
          mode: 'markers+text',
          showlegend: false,
          text: Array.from({length: inputData.xCoords.length}, (_, i) => String(i + 1)),
          marker: { size: 24, color: '#3b4351', symbol: 'square' },
          textfont: {color: '#fff', family: 'SUSE'},
          hoverlabel: { font: {family: 'SUSE'} },
          hovertemplate: inputData.hoverTemplates
        }]}
        layout={{
          width: 0.9*width,
          height: 0.9*height,
          xaxis: { showgrid: false, zeroline: false, visible: false },
          yaxis: { showgrid: false, zeroline: false, visible: false }
        }}
      />
    </div>
    : <></>
}
/* eslint-enable */

InputPreview.propTypes = InputPreviewPropTypes

export default InputPreview