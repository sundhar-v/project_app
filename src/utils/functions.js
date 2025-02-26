import { outputColorList, averageVehicleSpeed } from "./constants"
import { computeCostForRoute } from "./simple_cw"

export const  isValidFileUploaded=(file)=>{
  const validExtensions = ['xls','xlsx','csv']
  const fileExtension = file.name.split('.').pop()
  return validExtensions.includes(fileExtension)
}

export const timeStringToMinutes = (time) => {
  const [hour, minutes] = time.split(":").map(Number)
  return hour*60+minutes
}

export const timeMinutesToString = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

const getColorList = (numberOfRoutes) => {
  let colorList = []
  for (let i=0; i<numberOfRoutes; i++) {
    if (i < outputColorList.length) {
      colorList.push(outputColorList[i])
    } else {
      colorList.push(getRandomHexColor())
    }
  }
  return colorList
}


export const generateOutputPlotData = (routes, inputData) => {
  let plotData = []
  let colorList = getColorList(routes.length)

  for (let i=0; i<routes.length; i++) {
    let temp = [...routes[i]]
    temp.shift()
    temp.pop()

    const xCoordinates = [inputData.depot.x, ...temp.map(node => inputData.xCoords[node-1]), inputData.depot.x]
    const yCoordinates = [inputData.depot.y, ...temp.map(node => inputData.yCoords[node-1]), inputData.depot.y]
    const hoverTemplates = "Route "+(i+1)+" <extra></extra>"
    
    plotData.push({
      x: xCoordinates,
      y: yCoordinates,
      type: 'scatter',
      mode: 'lines+markers+text',
      showlegend: false,
      text: routes[i].map(node => String(node)),
      marker: { size: 24, color: colorList[i], symbol: 'square', line: { width: '2px' }},
      textfont: {color: '#fff', family: 'SUSE'},
      hoverlabel: { font: {family: 'SUSE'} },
      hovertemplate: hoverTemplates
    })
  }

  plotData.push({
    x: [inputData.depot.x],
    y: [inputData.depot.y],
    type: 'scatter',
    mode: 'markers+text',
    showlegend: false,
    text: "Depot",
    marker: { size: 44, color: '#ffb700', symbol: 'octagon' },
    textfont: {color: '#000', family: 'SUSE'},
    hoverlabel: { font: {family: 'SUSE'} },
    hovertemplate: "Depot <extra></extra>"
  })

  return plotData
}

const calculateRouteDemand = (route, inputData) => {
  let routeDemand = 0
  for (const node of route) {
    if (node !== 0) {
      routeDemand = routeDemand + inputData.demands[node-1]
    }
  }
  return routeDemand
}

const calculateRoutePickup = (route, inputData) => {
  let routePickup = 0
  for (const node of route) {
    if (node !== 0 ) {
      routePickup = routePickup + inputData.pickups[node-1]
    }
  }
  return routePickup
}

export const generateOutputTableData = (routes, inputData, distanceMatrix, deliveryStart) => {
  let tableData = [];
  const dStart = timeStringToMinutes(deliveryStart);

  for (const route of routes) {
    const routeName = [...route]
    routeName[0] = routeName[routeName.length-1] = "Depot"
    const routeCost = computeCostForRoute(route, distanceMatrix)
    const routeDemand = calculateRouteDemand(route, inputData)
    const routePickup = calculateRoutePickup(route, inputData)
    const nodeData = []
    const depotData = { "start": deliveryStart }

    let freshUnits = routeDemand
    let staleUnits = 0
    let currentDemand = 0
    let currentPickup = 0
    let departTime = dStart // from prev node
    for (let i=1; i<route.length-1; i++) {
      const nodeName = route[i]
      freshUnits = freshUnits - currentDemand
      staleUnits = staleUnits + currentPickup
      currentDemand = inputData.demands[nodeName-1]
      currentPickup = inputData.pickups[nodeName-1]
      const arrivalTime = departTime + (distanceMatrix[route[i-1]][route[i]] / averageVehicleSpeed) * 60
      departTime = Math.max(departTime + (distanceMatrix[route[i-1]][route[i]] / averageVehicleSpeed) * 60, inputData.timeWindows[nodeName-1][0])

      nodeData.push({
        nodeName: nodeName,
        freshUnits: freshUnits,
        staleUnits: staleUnits,
        nodeDemand: currentDemand,
        nodePickup: currentPickup,
        arrivalTime: timeMinutesToString(arrivalTime)
      })
    }

    depotData["end"] = timeMinutesToString(departTime + (distanceMatrix[route[route.length-2]][route[route.length-1]] / averageVehicleSpeed) * 60)

    tableData.push({
      routeName: routeName,
      routeCost: routeCost,
      routeDemand: routeDemand,
      routePickup: routePickup,
      nodeData: nodeData,
      depotData: depotData
    })
  }
  return tableData
}
