import React from 'react';

import { nCustomers, xCoords, yCoords, demands, routes } from '../../utils/clarke_wright';

const AlgorithmOld = () => {
  return (
    <div>
      <table className="table-auto border-2">
        <tr>
          <td><b>Nodes</b></td>
          {Array(nCustomers+1).keys().map(i => <td key={i}>{i}</td>)}
        </tr>
        <tr>
          <td><b>xCoords</b></td>
          {Array(nCustomers+1).keys().map(i => <td key={i}>{xCoords[i]}</td>)}
        </tr>
        <tr>
          <td><b>yCoords</b></td>
          {Array(nCustomers+1).keys().map(i => <td key={i}>{yCoords[i]}</td>)}
        </tr>
        <tr>
          <td><b>Demand</b></td>
          {Array(nCustomers+1).keys().map(i => <td key={i}>{demands[i]}</td>)}
        </tr>
      </table>
      <table className="table-auto border-2">
        <tr>
          <td><b>Route #</b></td>
          <td><b>Route</b></td>
        </tr>
        {Array(routes.length).keys().map(i => (
          <tr key={i}>
            <td>{"Route "+(i+1)}</td>
            <td>{routes[i].join(" -> ")}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AlgorithmOld