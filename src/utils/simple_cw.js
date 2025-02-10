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

export const generateSavings = (distance) => {
  let savings = []
  for (let i = 1; i < distance.length; i++) {
    for (let j = i+1; j < distance.length; j++) {
      const sv = distance[0][i] + distance[0][j] - distance[i][j]
      savings.push({ pair: [i,j].toString(), saving: sv })
    }
  }
  savings.sort((a,b) => b.saving - a.saving)
  return savings
}