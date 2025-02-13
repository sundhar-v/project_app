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

// Returns false if degree of the node is >=2
const isNodeAvailable = (node, padosiNodes) => {
  return (padosiNodes[node].length < 2)
}

export const ClarkeWrightDelivery = (savings, kimtiNodes) => {
  let padosiNodes = Object.fromEntries([...kimtiNodes].map(node => [node, []]))
  // let routes = []
  for (let i=0; i<savings.length; i++) {
    const [node1, node2] = savings[i].pair
    if (isNodeAvailable(node1, padosiNodes) && isNodeAvailable(node2, padosiNodes)) {
      continue
    }
  }
}