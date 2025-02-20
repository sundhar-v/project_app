import { outputColorList } from "./constants"

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
  const mins = minutes % 60;
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
      hovertemplate: "(x, y): (%{x}, %{y}) <extra></extra>"
      // hovertemplate: inputData.hoverTemplates
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
    hovertemplate: "(x, y): (%{x}, %{y}) <extra></extra>"
  })

  return plotData
}