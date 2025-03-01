import { timeStringToMinutes, timeMinutesToString } from "./functions";
import { 
  minimumDeliveryWindowDuration,
  averageVehicleSpeed as av,
  maximumWaitingTime as mwt,
  vehicleCapacity as vc
} from "./constants";

const generateRandomArray = (n, min, max) => Array.from(
  { length: n }, 
  () => Math.floor(Math.random() * (max - min + 1)) + min
);

const generateHoverTemplates = (numberOfCustomers, demands, pickups, timeWindows) => {
  let templates = []
  for (let i = 0; i < numberOfCustomers; i++) {
    templates.push("(x, y): (%{x}, %{y})<br>Demand: "+demands[i]+"<br>Pickup: "+pickups[i]+"<br>Time: "+timeMinutesToString(timeWindows[i][0])+" - "+timeMinutesToString(timeWindows[i][1])+"<extra></extra>")
  }
  return templates
}

const generateTimeWindow = (numberOfCustomers, deliveryStart, deliveryEnd) => {
  let tw = []
  const openTime = timeStringToMinutes(deliveryStart)
  const closeTime = timeStringToMinutes(deliveryEnd)
  const windowDuration = minimumDeliveryWindowDuration

  for (let i=0; i<numberOfCustomers; i++) {
    // Generate a random start time ensuring there's room for at least 2 hours
    const startTime = Math.floor(Math.random() * (closeTime - openTime - windowDuration + 1)) + openTime;
    
    // Randomly set the duration between 2 hours and the remaining time before close
    const maxPossibleDuration = closeTime - startTime;
    const duration = Math.floor(Math.random() * (maxPossibleDuration - windowDuration + 1)) + windowDuration;
    
    const endTime = startTime + duration;

    tw.push([startTime, endTime])
  }
  return tw
}

export const generateRandomData = (numberOfCustomers, vehicleCapacity, deliveryStart, deliveryEnd) => {
  const xCoords = generateRandomArray(numberOfCustomers + 1, 1, 200)
  const yCoords = generateRandomArray(numberOfCustomers + 1, 1, 100)
  const demands = generateRandomArray(numberOfCustomers, 0, vehicleCapacity/5)
  const pickups = generateRandomArray(numberOfCustomers, 0, vehicleCapacity/5)
  const timeWindows = generateTimeWindow(numberOfCustomers, deliveryStart, deliveryEnd)
  const hoverTemplates = generateHoverTemplates(numberOfCustomers, demands, pickups, timeWindows)

  return {
    depot: {x: xCoords[0], y: yCoords[0]},
    xCoords: xCoords.slice(1),
    yCoords: yCoords.slice(1),
    demands,
    pickups,
    hoverTemplates,
    timeWindows
  }
}

export const generateDataFromJSON = (jsonData) => {
  let xCoords = []
  let yCoords = []
  let demands = []
  let pickups = []
  let timeWindows = []
  let hoverTemplates = []

  const { variables = {}, depot = {}, customers = []} = jsonData;
  const { vehicleCapacity = vc, maximumWaitingTime = mwt, averageVehicleSpeed = av } = variables;

  for (const customer of customers) {
    const { x, y, demand, pickup, timeWindow } = customer
    xCoords.push(Number(x))
    yCoords.push(Number(y))
    demands.push(Number(demand))
    pickups.push(Number(pickup))
    timeWindows.push([timeStringToMinutes(timeWindow[0]),timeStringToMinutes(timeWindow[1])])
    hoverTemplates.push("(x, y): (%{x}, %{y})<br>Demand: "+demand+"<br>Pickup: "+pickup+"<br>Time: "+timeWindow[0]+" - "+timeWindow[1]+"<extra></extra>")
  }

  return {
    numberOfCustomers: customers.length,
    vehicleCapacity: Number(vehicleCapacity),
    maximumWaitingTime: Number(maximumWaitingTime),
    averageVehicleSpeed: Number(averageVehicleSpeed),
    deliveryStart: depot["deliveryStart"],
    deliveryEnd: depot["deliveryEnd"],
    inputData: {
      depot: {x: Number(depot["x"]), y: Number(depot["y"])},
      xCoords,
      yCoords,
      demands,
      pickups,
      hoverTemplates,
      timeWindows
    }
  }
}