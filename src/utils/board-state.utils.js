import {cloneDeep} from "@apollo/client/utilities";
import {getAdjacentNodes, getMyLocation} from "@/utils/board.utils";

export function getAmendedNodes(currentState){
  let {actionState, board} = currentState;
  let amendedNodes = cloneDeep(board.nodes);
  universalNodeAmendments({...currentState,amendedNodes})
  if(nodeAmendingMap[actionState]){
    nodeAmendingMap[actionState]({...currentState,amendedNodes})
  }
  return amendedNodes;
}

export function getAmendedConnections(currentState){
  let {actionState, board} = currentState;
  let amendedConnections = cloneDeep(board.connections);
  universalConnectionAmendments({...currentState,amendedConnections})
  if(connectionAmendingMap[actionState]){
    connectionAmendingMap[actionState]({...currentState,amendedConnections})
  }
  return amendedConnections;
}

function universalNodeAmendments({amendedNodes}){
  for(let node of amendedNodes){
    if(node.state.length === 0){
      node.state.push('NORMAL');
    }
  }
}

function universalConnectionAmendments({amendedConnections}){
  for(let connection of amendedConnections){
    if(connection.state.length === 0){
      connection.state.push('NORMAL');
    }
  }
}

const connectionAmendingMap = {
  MOVE({board, amendedConnections, myUserId, selected, actionsSubmitted}){
    let myLocation = getMyLocation(board,myUserId)
    for (let connection of amendedConnections) {
      if(connection.state.includes('BLOCKED')){
        continue;
      }
      if (selected && connection.nodes.includes(selected.label) && connection.nodes.includes(myLocation) && myLocation !== selected.label) {
        if (actionsSubmitted) {
          connection.state = ['COMMITTED']
        } else {
          connection.state = ['SELECTED']
        }
        continue
      }
      if (!actionsSubmitted && connection.nodes.includes(myLocation)) {
        connection.state = ['AVAILABLE']
      }
    }
  },
  BLOCK({amendedConnections, selected, actionsSubmitted}){
    for (let connection of amendedConnections) {
      if(connection.state.includes('BLOCKED')){
        continue;
      }
      if (selected && JSON.stringify(selected.nodes.sort()) === JSON.stringify(connection.nodes.sort())) {
        if (actionsSubmitted) {
          connection.state = ['COMMITTED']
        } else {
          connection.state = ['SELECTED', 'SELECTABLE']
        }
        continue;
      }
      connection.state = ['AVAILABLE', 'SELECTABLE']
    }
  }
}

const nodeAmendingMap = {
  MOVE({board, amendedNodes, myUserId, selected, actionsSubmitted}){
    let adjacent = getAdjacentNodes(board,getMyLocation(board,myUserId))
    for (let node of amendedNodes) {
      if (selected && node.label === selected.label) {
        if (actionsSubmitted) {
          node.state = ['COMMITTED']
        } else {
          node.state = ['SELECTED', 'SELECTABLE']
        }
        continue;
      }
      if (!actionsSubmitted && adjacent.includes(node.label)) {
        node.state = ['AVAILABLE', 'SELECTABLE']
      }
    }
  }
}