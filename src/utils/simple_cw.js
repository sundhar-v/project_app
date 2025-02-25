import { timeStringToMinutes } from "./functions"

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
  savings.sort((a,b) => b.saving - a.saving) // descinding order sort
  //console.log(savings)
  return savings
}

//check for degree-2 constraints
const isViolatingDeg2Constraint = (node, route) => {
  const idx = route.indexOf(node);
  return idx !== -1 && idx !== 0 && idx !== route.length - 1;
}

const calculateRouteTotalDemand = (inputList, inputData) => {
  let routeDemand = 0
  for (const node of inputList) {
    routeDemand = routeDemand + inputData.demands[node-1]
  }
  return routeDemand
}

const calculateRouteTotalPickup = (inputList, inputData) => {
  let routePickup = 0
  for (const node of inputList) {
    routePickup = routePickup + inputData.demands[node-1]
  }
  return routePickup
}

const isDeliveryFromDepotFeasible = (route1, route2, vehicleCapacity, inputData) => {
  // sums the demand and pickup of all the nodes in the new route (order doesn't matter because nodes same across different combinations)
  // and checks if the vehicle has the capacity to carry the goods to and from the depot
  let nodes = new Set()
  if (route1) {
    route1.forEach(node => nodes.add(node))
  }
  if (route2) {
    route2.forEach(node => nodes.add(node))
  }
  
  const routeDemand = calculateRouteTotalDemand(nodes, inputData)
  const routePickup = calculateRouteTotalPickup(nodes, inputData)
  return routeDemand <= vehicleCapacity && routePickup <= vehicleCapacity
}

const generateRouteCombinations = (routeA, routeB, vehicleCapacity, inputData) => {
  let routeCombinations = [];

  // check if sum of demands of customers in the new route can be fulfilled by the vehicle
  if (!isDeliveryFromDepotFeasible(routeA, routeB, vehicleCapacity, inputData)) {
    return routeCombinations
  }

  const isMultipleNodesInA = routeA.length > 1;
  const isMultipleNodesInB = routeB.length > 1;

  // Define route options based on size
  const routesA = isMultipleNodesInA ? [routeA, [...routeA].reverse()] : [routeA];
  const routesB = isMultipleNodesInB ? [routeB, [...routeB].reverse()] : [routeB];

  // Generate combinations
  for (const a of routesA) {
    for (const b of routesB) {
      routeCombinations.push([...a, ...b]); // A forward + B forward
      routeCombinations.push([...b, ...a]); // B forward + A forward
    }
  }

  return routeCombinations;
}

const generateTempRoutes = (route1, route2, node1, node2, vehicleCapacity, inputData) => {
  // no match with existing routes
  if (!route1 && !route2) {
    return generateRouteCombinations([node1], [node2], vehicleCapacity, inputData)
  }
  // match with 1 existing route
  else if (route1 && !route2) {
    if (!isViolatingDeg2Constraint(node1, route1)) {
      return generateRouteCombinations(route1, [node2], vehicleCapacity, inputData)
    }
  }
  else if (!route1 && route2) {
    if (!isViolatingDeg2Constraint(node2, route2)){
      return generateRouteCombinations([node1], route2, vehicleCapacity, inputData)
    }
  }
  // match with 2 existing routes
  else if (route1 !== route2) {
    if (!isViolatingDeg2Constraint(node1, route1) && !isViolatingDeg2Constraint(node2, route2)){
      return generateRouteCombinations(route1, route2, vehicleCapacity, inputData)
    }
  }

  // If the nodes 1 & 2 belong to the same route, there will not be any routes generated
  return null
}

const isRouteFeasible = (
  route,
  vehicleCapacity,
  inputData,
  distanceMatrix,
  averageVehicleSpeed,
  maximumWaitingTime,
  deliveryStart,
  deliveryEnd
) => {
  let currentVehicleCap = calculateRouteTotalDemand(route, inputData)
  let currentTime = deliveryStart
  let currentNode = 0
  for (const node of route) {
    // Time window feasibility
    currentTime = currentNode !== 0 
      ? currentTime + (distanceMatrix[currentNode][node] / averageVehicleSpeed) * 60
      : Math.max(currentTime + (distanceMatrix[currentNode][node] / averageVehicleSpeed) * 60, inputData.timeWindows[node-1][0])
    // if arrival time at node exceeds delivery end or made to wait more than tolerable waiting limit then the route is not feasible
    // excluding this check if current node = 0 (depot)
    if (currentNode !== 0 && (currentTime > deliveryEnd || (inputData.timeWindows[node-1][0] - currentTime) > maximumWaitingTime)) {
      return false
    }
    // capacity feasibility
    currentVehicleCap = currentVehicleCap - inputData.demands[node-1] + inputData.pickups[node-1]
    if (currentVehicleCap > vehicleCapacity) {
      return false
    }
    currentNode = node
  }
  return true
}

const computeCostForRoute = (route, distanceMatrix) => {
  let cost = 0
  // add the distances between the nodes of the route
  for (let i=1; i<route.length; i++) {
    cost = cost + distanceMatrix[route[i-1]][route[i]]
  }
  // add distance from depot to first node and distance to depot from last node
  cost = cost + distanceMatrix[0][route[0]] + distanceMatrix[route[route.length-1]][0]

  return cost
}

const selectBestRoute = (routes, cost, distanceMatrix)  => {
  let ranking = []
  for (const route of routes) {
    let routeCost = computeCostForRoute(route, distanceMatrix)
    cost[route] = routeCost
    ranking.push({ route: route, routeCost: routeCost })
  }
  ranking.sort((a,b) => a.routeCost - b.routeCost) // ascending order sort
  return ranking[0].route
}

export const ClarkeWright = (
  savings,
  kimtiNodes,
  vehicleCapacity,
  inputData,
  distanceMatrix,
  averageVehicleSpeed,
  maximumWaitingTime,
  deliveryStart,
  deliveryEnd
) => {
  let routes = []
  let cost = {}

  const dStart = timeStringToMinutes(deliveryStart)
  const dEnd = timeStringToMinutes(deliveryEnd)

  const routeNodes = new Set()

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

      // Algorithm starts here

      let tempRoutes = generateTempRoutes(route1, route2, node1, node2, vehicleCapacity, inputData)

      // check for Delivery and Pickup feasibility for all the generated routes
      if (tempRoutes) {
        let feasibleRoutes = [];
        // check for feasibility for each of the possible routes
        for (let k=0; k<tempRoutes.length; k++) {
          if (isRouteFeasible(
            tempRoutes[k],
            vehicleCapacity,
            inputData,
            distanceMatrix,
            averageVehicleSpeed,
            maximumWaitingTime,
            dStart,
            dEnd
          )) {
            feasibleRoutes.push(tempRoutes[k])
          }
        }
        // Rank all feasible routes and push the best to the routes array
        if (feasibleRoutes.length > 0) {
          let bestRoute = null
          // no match with existing routes
          if (!route1 && !route2) {
            bestRoute = feasibleRoutes[0]

            routes.push(bestRoute)
            bestRoute.forEach(node => routeNodes.add(node))
          }
          // match with 1 existing route
          else if (route1 && !route2) {
            bestRoute = selectBestRoute(feasibleRoutes, cost, distanceMatrix)
            routes = routes.filter(route => route.toString() !== route1.toString());

            routes.push(bestRoute)
            bestRoute.forEach(node => routeNodes.add(node))
          }
          else if (!route1 && route2) {
            bestRoute = selectBestRoute(feasibleRoutes, cost, distanceMatrix)
            routes = routes.filter(route => route.toString() !== route2.toString());

            routes.push(bestRoute)
            bestRoute.forEach(node => routeNodes.add(node))
          }
          // match with 2 existing routes
          else if (route1 !== route2) {
            bestRoute = selectBestRoute(feasibleRoutes, cost, distanceMatrix)

            const route1Cost = cost[route1] ? cost[route1] : computeCostForRoute(route1, distanceMatrix)
            const route2Cost = cost[route2] ? cost[route2] : computeCostForRoute(route2, distanceMatrix)
            const bestRouteCost = cost[bestRoute] ? cost[bestRoute] : computeCostForRoute(bestRoute, distanceMatrix)

            // proceed with merge only if the merged route cost is less than individual routes
            if (route1Cost + route2Cost > bestRouteCost) {
              routes = routes.filter(route => route.toString() !== route1.toString());
              routes = routes.filter(route => route.toString() !== route2.toString());

              routes.push(bestRoute)
              bestRoute.forEach(node => routeNodes.add(node))
            }
          }
        }
      }
    }
  }

  // Generating routes for customers that cannot be paired with others
  const leftOverNodes = [...kimtiNodes].filter(node => !routeNodes.has(node))
  for (const node of leftOverNodes) {
    routes.push([node])
  }

  // add depot to start and end of each routes
  routes = routes.map(route => [0, ...route, 0])

  return routes
}