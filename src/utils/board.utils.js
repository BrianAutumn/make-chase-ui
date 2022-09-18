export function getMyRole(board, myUserId) {
  return this?.board?.roles.find(role => role.user._id === myUserId).role;
}

export function isMyTurn(board, myUserId) {
  return this?.board?.turn.role === getMyRole(board, myUserId);
}

export function getMyLocation(board, myUserId) {
  return this?.board?.pieces.find(piece => piece.label === getMyRole(board, myUserId)).location;
}

export function getAdjacentNodes(board, nodeLabel) {
  let adjacentNodes = new Set();
  for (let connection of board.connections) {
    if (connection.nodes.includes(nodeLabel) && connection !== 'BLOCKED') {
      connection.nodes.forEach(node => adjacentNodes.add(node))
    }
  }
  return Array.from(adjacentNodes);
}