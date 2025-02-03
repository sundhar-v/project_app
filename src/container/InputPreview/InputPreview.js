import React from 'react';
import Plot from 'react-plotly.js';

import InputPreviewPropTypes from './InputPreview.propTypes'

/* eslint-disable */
const InputPreview = ({ inputData }) => {
  return Object.keys(inputData).length 
    ? <Plot
      data={[{
        x: inputData.xCoords,
        y: inputData.yCoords,
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'blue'}
      }, {
        x: [inputData.depot.x],
        y: [inputData.depot.y],
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'red'},
      }]}
      layout={ {width: 600, height: 400, title: {text: 'Input Plot'}} }
    />
    : <></>
}
/* eslint-enable */

InputPreview.propTypes = InputPreviewPropTypes

export default InputPreview