import React from 'react';

import RouteDetailPropTypes from './RouteDetail.propTypes';

const RouteDetail = ({routeData, currentRoute}) => {
  console.log(routeData)
  return (
    <>
      <div className="tile tile-centered">
        <div className="tile-content">
          <div className="tile-title">{routeData.routeName.join(" -> ")}</div>
          <small className="tile-subtitle text-gray">{"Route" + currentRoute}</small>
        </div>
      </div>
    </>
  )
}

RouteDetail.propTypes = RouteDetailPropTypes

export default RouteDetail