import {cloneDeep} from "@apollo/client/utilities";
import {getAdjacentNodes, getMyLocation} from "@/utils/board.utils";

export function getAmendedNodes({actionState, board}){
  let amendedNodes = cloneDeep(board.nodes);
  if(nodeAmendingMap[actionState]){
    nodeAmendingMap[actionState]({...arguments,amendedNodes})
  }
  return amendedNodes;
}

export function getAmendedConnections({actionState, board}){
  let amendedConnections = cloneDeep(board.connections);
  if(connectionAmendingMap[actionState]){
    connectionAmendingMap[actionState]({...arguments,amendedConnections})
  }
  return amendedConnections;
}

const connectionAmendingMap = {
  MOVE({board, amendedConnections, myUserId, selected, actionSubmitted}){
    let myLocation = getMyLocation(board,myUserId)
    for (let connection of amendedConnections) {
      if(connection === 'BLOCKED'){
        continue;
      }
      if (connection.nodes.includes(this.selected.label) && connection.nodes.includes(myLocation) && myLocation !== selected.label) {
        if (actionSubmitted) {
          connection.state = 'COMMITTED'
        } else {
          connection.state = 'SELECTED'
        }
        continue;
      }
      if (!actionSubmitted && connection.nodes.includes(myLocation)) {
        connection.state = 'AVAILABLE'
      }
    }
  },
  BLOCK({amendedConnections, selected, actionSubmitted}){
    for (let connection of amendedConnections) {
      if(connection === 'BLOCKED'){
        continue;
      }
      if (JSON.stringify(selected.nodes.sort()) === JSON.stringify(connection.nodes.sort())) {
        if (actionSubmitted) {
          connection.state = 'COMMITTED'
        } else {
          connection.state = 'SELECTED'
        }
        continue;
      }
      connection.state = 'AVAILABLE'
    }
  }
}

const nodeAmendingMap = {
  MOVE({board, amendedNodes, myUserId, selected, actionSubmitted}){
    let adjacent = getAdjacentNodes(board,getMyLocation(board,myUserId))
    for (let node of amendedNodes) {
      if (node.label === selected.label) {
        if (actionSubmitted) {
          node.state = 'COMMITTED'
        } else {
          node.state = 'SELECTED'
        }
        continue
      }
      if (!actionSubmitted && adjacent.includes(node.label)) {
        node.state = 'AVAILABLE'
      }
    }
  }
}