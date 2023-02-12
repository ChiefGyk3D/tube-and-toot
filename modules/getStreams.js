const request = require('request');

async function getData(channelName, APIKey) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelName}&type=video&eventType=live&key=${APIKey}`,
      (error, res, body) => {
        if (error) {
          return console.error(error);
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

module.exports = { getData };
