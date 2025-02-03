export const generateRandomData = (numberOfCustomers, vehicleCapacity) => {
  const randGen = () => Math.random();
  const xCoords = Array.from({ length: numberOfCustomers + 1 }, () => randGen() * 200);
  const yCoords = Array.from({ length: numberOfCustomers + 1 }, () => randGen() * 100);
  const demands = Array.from({ length: numberOfCustomers }, () => Math.floor(randGen() * vehicleCapacity));
  const pickups = Array.from({ length: numberOfCustomers }, () => Math.floor(randGen() * vehicleCapacity));

  return {
    depot: {x: xCoords[0], y: yCoords[0]},
    xCoords: xCoords.slice(1),
    yCoords: yCoords.slice(1),
    demands,
    pickups
  }
}