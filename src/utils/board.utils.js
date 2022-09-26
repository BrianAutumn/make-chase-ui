export function getMyRole(board, myUserId) {
  return board?.roles.find(role => role.user._id === myUserId).role;
}

export function isMyTurn(board, myUserId) {
  let myRole = getMyRole(board,myUserId);
  if(!myRole){
    return false;
  }
  return board?.turn.role === getMyRole(board, myUserId);
}

export function getMyLocation(board, myUserId) {
  return board?.pieces.find(piece => piece.label === getMyRole(board, myUserId)).location;
}

export function getAdjacentNodes(board, nodeLabel) {
  let adjacentNodes = new Set();
  for (let connection of board.connections) {
    if (connection.nodes.includes(nodeLabel) && !connection.state.includes('BLOCKED')) {
      connection.nodes.forEach(node => adjacentNodes.add(node))
    }
  }
  return Array.from(adjacentNodes);
}