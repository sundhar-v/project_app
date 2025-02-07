const generateRandomArray = (n, min, max) => Array.from(
  { length: n }, 
  () => Math.floor(Math.random() * (max - min + 1)) + min
);

const generateHoverTemplates = (numberOfCustomers, demands, pickups, timeWindows) => {
  let templates = []
  for (let i = 0; i < numberOfCustomers; i++) {
    templates.push("(x, y): (%{x}, %{y})<br>Demand: "+demands[i]+"<br>Pickup: "+pickups[i]+"<br>Time: "+timeWindows[i][0]+":00 - "+timeWindows[i][1]+":00<extra></extra>")
  }
  return templates
}

const generateTimeWindow = (numberOfCustomers) => {
  let tw = []
  const morning = [9, 12]
  const afternoon = [13, 17]
  const evening = [18, 22]
  const work = [9, 18]
  const home = [9, 22]

  for (let i=0; i<numberOfCustomers; i++) {
    const randomNumber = Math.floor(Math.random() * 5) + 1
    if(randomNumber === 1) {
      tw.push(morning)
    } else if (randomNumber === 2) {
      tw.push(afternoon)
    } else if (randomNumber === 3) {
      tw.push(evening)
    } else if (randomNumber === 4) {
      tw.push(work)
    } else {
      tw.push(home)
    }
  }
  return tw
}

export const generateRandomData = (numberOfCustomers, vehicleCapacity) => {
  const xCoords = generateRandomArray(numberOfCustomers + 1, 1, 200)
  const yCoords = generateRandomArray(numberOfCustomers + 1, 1, 100)
  const demands = generateRandomArray(numberOfCustomers, 0, vehicleCapacity)
  const pickups = generateRandomArray(numberOfCustomers, 0, vehicleCapacity)
  const timeWindows = generateTimeWindow(numberOfCustomers)
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