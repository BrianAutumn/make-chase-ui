import {getToken} from "@/token-manger";

const secure = document.location.protocol.toLowerCase() === 'https:'
const httpProtocol = secure?'https:':'http:';
const wsProtocol = secure?'wss:':'ws:';

export const appConf = {
  google: {
    clientId: getToken('GOOGLE_CLIENT_ID')
  },
  apollo: {
    httpUrl: `${httpProtocol}//${document.location.host}/api`,
    wsUrl: `${wsProtocol}//${document.location.host}/wss`
  }
}