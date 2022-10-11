import {tokens} from "./tokens";

//Stupid workaround for the token replacement mechanism
const tokenDeliminator = '#'

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
  console.log('Test Flag')
  return tokenValue !== (tokenDeliminator + tokenDeliminator + name + tokenDeliminator + tokenDeliminator)
}