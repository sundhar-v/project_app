const generateRandomArray = (n, min, max) => Array.from(
  { length: n }, 
  () => Math.floor(Math.random() * (max - min + 1)) + min
);

const generateHoverTemplates = (numberOfCustomers, demands, pickups) => {
  let templates = []
  console.log(demands, pickups)
  for (let i = 0; i < numberOfCustomers; i++) {
    templates.push("(x, y): (%{x}, %{y})<br>Demand: "+demands[i]+"<br>Pickup: "+pickups[i]+"<extra></extra>")
  }
  return templates
}

export const generateRandomData = (numberOfCustomers, vehicleCapacity) => {
  const xCoords = generateRandomArray(numberOfCustomers + 1, 1, 200)
  const yCoords = generateRandomArray(numberOfCustomers + 1, 1, 100)
  const demands = generateRandomArray(numberOfCustomers, 0, vehicleCapacity)
  const pickups = generateRandomArray(numberOfCustomers, 0, vehicleCapacity)
  const hoverTemplates = generateHoverTemplates(numberOfCustomers, demands, pickups)

  return {
    depot: {x: xCoords[0], y: yCoords[0]},
    xCoords: xCoords.slice(1),
    yCoords: yCoords.slice(1),
    demands,
    pickups,
    hoverTemplates
  }
}