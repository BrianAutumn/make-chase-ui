const secure = document.location.protocol.toLowerCase() === 'https:'
const httpProtocol = secure?'https:':'http:';
const wsProtocol = secure?'wss:':'ws:';

export const appConf = {
  google: {
    clientId: "92116833711-06i78gunp707ht8vla0cdnsft3f1n5ks.apps.googleusercontent.com"
  },
  apollo: {
    httpUrl: `${httpProtocol}//${document.location.host}/api`,
    wsUrl: `${wsProtocol}//${document.location.host}/wss`
  }
}