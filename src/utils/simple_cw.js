export const generateDistanceMatrix = (n, depot, xCoords, yCoords) => {
  const xCoordinates = [depot.x, ...xCoords]
  const yCoordinates = [depot.y, ...yCoords]
  let matrix = Array.from(Array(n+1), () => new Array(n+1).fill(0))

  for (let i=0; i<n+1; i++) {
    for (let j=i+1; j<n+1; j++) {
      const distance = Math.sqrt(
        Math.pow(xCoordinates[i] - xCoordinates[j], 2) + Math.pow(yCoordinates[i] - yCoordinates[j], 2)
      )
      matrix[i][j] = distance
      matrix[j][i] = distance
    }
  }

  return matrix
}

export const generateNodesList = (demands, pickups) => {
  let kimtiNodes = new Set()
  let faltuNodes = new Set()
  for (let i=0; i<demands.length; i++) {
    if (demands[i] + pickups[i] === 0) {
      faltuNodes.add(i+1)
    } else {
      kimtiNodes.add(i+1)
    }
  }
  return [kimtiNodes, faltuNodes]
}

export const generateSavings = (distance, faltuNodes) => {
  let savings = []
  for (let i = 1; i < distance.length; i++) {
    for (let j = i+1; j < distance.length; j++) {
      if (!(faltuNodes.has(i) || faltuNodes.has(j))) {
        const sv = distance[0][i] + distance[0][j] - distance[i][j]
        savings.push({ pair: [i,j], saving: sv })
      }
    }
  }
  savings.sort((a,b) => b.saving - a.saving)
  //console.log(savings)
  return savings
}

//check for degree-2 constraints
const isViolatingDeg2Constraint = (node, route) => {
  const idx = route.indexOf(node);
  return idx !== -1 && idx !== 0 && idx !== route.length - 1;
}

const generateRouteCombinations = (routeA, routeB) => {
  const isMultipleNodesInA = routeA.length > 1;
  const isMultipleNodesInB = routeB.length > 1;

  let routeCombinations = [];

  // Define route options based on size
  const routesA = isMultipleNodesInA ? [routeA, [...routeA].reverse()] : [routeA];
  const routesB = isMultipleNodesInB ? [routeB, [...routeB].reverse()] : [routeB];

  // Generate combinations
  for (const a of routesA) {
    for (const b of routesB) {
      routeCombinations.push([...a, ...b]); // A forward + B forward
      if (isMultipleNodesInA && isMultipleNodesInB) {
        routeCombinations.push([...b, ...a]); // B forward + A forward
      }
    }
  }

  return routeCombinations;
}

const generateTempRoutes = (route1, route2, node1, node2) => {
  // no match with existing routes
  if (!route1 && !route2) {
    return generateRouteCombinations([node1], [node2])
  }
  // match with 1 existing route
  else if (route1 && !route2) {
    if (!isViolatingDeg2Constraint(node1, route1)) {
      return generateRouteCombinations(route1, [node2])
    }
  }
  else if (!route1 && route2) {
    if (!isViolatingDeg2Constraint(node2, route2)){
      return generateRouteCombinations([node1], route2)
    }
  }
  // match with 2 existing routes
  else if (route1 !== route2) {
    if (!isViolatingDeg2Constraint(node1, route1) && !isViolatingDeg2Constraint(node2, route2)){
      return generateRouteCombinations(route1, route2)
    }
  }

  // If the nodes 1 & 2 belong to the same route, there will not be any routes generated
  return null
}

const isDeliveryPickupFeasible = (route, inputData) => {
  return
}

const isTimeWindowFeasible = (route, inputData) => {
  return
}

export const ClarkeWright = (savings, kimtiNodes) => {
  let routes = []

  for (let i=0; i<savings.length; i++) {
    const [node1, node2] = savings[i].pair

    // proceed if both customers have atleast delivery or pickup scheduled
    if (kimtiNodes.has(node1) && kimtiNodes.has(node2)) {
      let route1 = null, route2 = null

      for (let j=0; j<routes.length; j++) {
        if (routes[j].includes(node1)) {
          route1 = routes[j]
        }
        if (routes[j].includes(node2)) {
          route2 = routes[j]
        }
      }

      let routeCombinations = generateTempRoutes(route1, route2, node1, node2)

      // check for Delivery and Pickup feasibility for all the generated routes
      if (routeCombinations) {

      }
    }

  }
}