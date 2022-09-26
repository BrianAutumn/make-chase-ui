import {cloneDeep} from "@apollo/client/utilities";
import {getAdjacentNodes, getMyLocation} from "@/utils/board.utils";

export function getAmendedNodes(currentState){
  let {actionState, board, actionsSubmitted} = currentState;
  let amendedNodes = cloneDeep(board.nodes);
  universalNodeAmendments({...currentState,amendedNodes})
  if(board.victory){
    return amendedNodes;
  }
  if(actionsSubmitted){
    nodeAmendingMap.SUBMITTED({...currentState,amendedNodes})
  }else if(nodeAmendingMap[actionState]){
    nodeAmendingMap[actionState]({...currentState,amendedNodes})
  }
  return amendedNodes;
}

export function getAmendedConnections(currentState){
  let {actionState, board, actionsSubmitted} = currentState;
  let amendedConnections = cloneDeep(board.connections);
  universalConnectionAmendments({...currentState,amendedConnections})
  if(board.victory){
    return amendedConnections;
  }
  if(actionsSubmitted) {
    connectionAmendingMap.SUBMITTED({...currentState,amendedConnections})
  } else if(connectionAmendingMap[actionState]){
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
  SUBMITTED({amendedConnections, committedActions, board, myUserId}){
    for(let connection of amendedConnections){
      for(let action of committedActions){
        let target = JSON.parse(action.args);
        if(action.code === 'MOVE'){
          let myLocation = getMyLocation(board,myUserId)
          if(connection.nodes.includes(myLocation) && connection.nodes.includes(target)){
            connection.state = ['MOVING']
          }
        }else if(action.code === 'BLOCK'){
          if(JSON.stringify(connection.nodes.sort()) === JSON.stringify(target.sort())){
            connection.state = ['BLOCKING']
          }
        }
      }
    }
  },
  MOVE({board, amendedConnections, myUserId, selected}){
    let myLocation = getMyLocation(board,myUserId)
    for (let connection of amendedConnections) {
      if(connection.state.includes('BLOCKED')){
        continue;
      }
      if (selected && connection.nodes.includes(selected.label) && connection.nodes.includes(myLocation) && myLocation !== selected.label) {
        connection.state = ['SELECTED']
        continue
      }
      if (connection.nodes.includes(myLocation)) {
        connection.state = ['AVAILABLE']
      }
    }
  },
  BLOCK({amendedConnections, selected}){
    for (let connection of amendedConnections) {
      if(connection.state.includes('BLOCKED')){
        continue;
      }
      if (selected && JSON.stringify(selected.nodes.sort()) === JSON.stringify(connection.nodes.sort())) {
        connection.state = ['SELECTED', 'SELECTABLE']
        continue;
      }
      connection.state = ['AVAILABLE', 'SELECTABLE']
    }
  }
}

const nodeAmendingMap = {
  SUBMITTED({amendedNodes, committedActions}) {
    for (let node of amendedNodes) {
      for (let action of committedActions) {
        if(action.code === 'MOVE'){
          let target = JSON.parse(action.args);
          if(target === node.label){
            node.state = ['MOVING']
          }
        }
      }
    }
  },
  MOVE({board, amendedNodes, myUserId, selected}){
    let adjacent = getAdjacentNodes(board,getMyLocation(board,myUserId))
    for (let node of amendedNodes) {
      if(selected && node.label === selected.label) {
        node.state = ['SELECTED', 'SELECTABLE']
        continue;
      }
      if (adjacent.includes(node.label)) {
        node.state = ['AVAILABLE', 'SELECTABLE']
      }
    }
  }
}