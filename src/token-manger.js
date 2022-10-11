import {tokens} from "./tokens";

export function getToken(name){
  if(!tokens[name]){
    throw `Token '${name}' not defined!`
  }
  if(isSet(tokens[name].token,name) || !tokens[name].local){
    return tokens[name].token
  }
  return tokens[name].local;
}

function isSet(tokenValue, name){
  return tokenValue !== `##${name}##`
}