// Clarke-Wright Savings Algorithm Implementation in JavaScript ES6+

const nCustomers = 23;
const vehicleCapacity = 100;
const maxCustomerDemand = 75;

// Data Generation
const randGen = () => Math.random();
const xCoords = Array.from({ length: nCustomers + 1 }, () => randGen() * 200);
const yCoords = Array.from({ length: nCustomers + 1 }, () => randGen() * 100);
const demands = [0, ...Array.from({ length: nCustomers }, () => Math.floor(randGen() * maxCustomerDemand))];

const plotCoordinates = (xCoords, yCoords) => {
  console.log("Plotting coordinates: Please use a graphical library for visualization.");
}

// Distance Matrix
const calculateDistanceMatrix = (xCoords, yCoords) => {
  const n = xCoords.length;
  const distMatrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = Math.sqrt(
        Math.pow(xCoords[i] - xCoords[j], 2) + Math.pow(yCoords[i] - yCoords[j], 2)
      );
      distMatrix[i][j] = dist;
      distMatrix[j][i] = dist;
    }
  }
  return distMatrix;
}

const distances = calculateDistanceMatrix(xCoords, yCoords);

// Savings Calculation
const calculateSavings = (distances, demands) => {
  const savings = new Map();

  for (let i = 1; i < distances.length; i++) {
    for (let j = i + 1; j < distances.length; j++) {
      const saving =
        distances[0][i] + distances[0][j] - distances[i][j];
      savings.set(`(${i},${j})`, saving);
    }
  }

  return Array.from(savings.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ link: key, saving: value }));
}

const savings = calculateSavings(distances, demands);

// Helper Functions
const parseLink = (link) => link.match(/\d+/g).map(Number);

const isConnected = (node, route) => {
  const idx = route.indexOf(node);
  return idx !== -1 && idx !== 0 && idx !== route.length - 1;
}

const mergeRoutes = (route1, route2, link) => {
  if (route1.indexOf(link[0]) !== route1.length - 1) route1.reverse();
  if (route2.indexOf(link[1]) !== 0) route2.reverse();
  return [...route1, ...route2];
}

const calculateLoad = (route, demands) =>
  route.reduce((sum, node) => sum + demands[node], 0);

// Main Logic
const routes = [];
const nodesRemaining = new Set(Array.from({ length: nCustomers }, (_, i) => i + 1));

savings.forEach(({ link }) => {
  const [i, j] = parseLink(link);
  let route1 = null;
  let route2 = null;

  routes.forEach((route) => {
    if (route.includes(i)) route1 = route;
    if (route.includes(j)) route2 = route;
  })

  if (!route1 && !route2) {
    if (demands[i] + demands[j] <= vehicleCapacity) {
      routes.push([0, i, j, 0]);
      nodesRemaining.delete(i);
      nodesRemaining.delete(j);
    }
  } else if (route1 && !route2) {
    if (!isConnected(i, route1) && calculateLoad([...route1, j], demands) <= vehicleCapacity) {
      route1.splice(route1.indexOf(i) + 1, 0, j);
      nodesRemaining.delete(j);
    }
  } else if (!route1 && route2) {
    if (!isConnected(j, route2) && calculateLoad([...route2, i], demands) <= vehicleCapacity) {
      route2.splice(route2.indexOf(j) + 1, 0, i);
      nodesRemaining.delete(i);
    }
  } else if (route1 !== route2) {
    if (
      !isConnected(i, route1) &&
      !isConnected(j, route2) &&
      calculateLoad([...route1, ...route2], demands) <= vehicleCapacity
    ) {
      const mergedRoute = mergeRoutes(route1, route2, [i, j]);
      routes.splice(routes.indexOf(route1), 1);
      routes.splice(routes.indexOf(route2), 1);
      routes.push(mergedRoute);
    }
  }
})

nodesRemaining.forEach((node) => {
  if (demands[node] <= vehicleCapacity) routes.push([0, node, 0]);
})

console.log("Routes:", routes);
