const mastodon = require("mastodon-api");
const config = require("./config.json");
const fs = require("fs");
const { getData } = require("./modules/getStreams.js");
const messages = config.messages;
const randomIndex = Math.floor(Math.random() * messages.length);

async function postToMastodon(status) {
  const M = new mastodon({
    access_token: config.mastodonAccessToken,
    api_url: config.mastodonInstance + "/api/v1/"
  });

  M.post("statuses", { status: status }, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Post to Mastodon successful!");
    }
  });
}

async function checkYouTubeStatus() {
  const youtubeData = await getData(config.channelName, config.APIKey);

  if (youtubeData.items.length === 0) {
    console.log(`No videos found for ${config.channelName}.`);
    return;
  }

  const latestVideo = youtubeData.items[0];
  const latestVideoId = latestVideo.id.videoId;

  const lastVideoId = fs.existsSync("./lastVideoId.txt")
    ? fs.readFileSync("./lastVideoId.txt").toString()
    : "";
  if (latestVideoId !== lastVideoId) {
    postToMastodon(messages[Math.floor(Math.random() * messages.length)]);

    fs.writeFileSync("./lastVideoId.txt", latestVideoId);
  }
}

checkYouTubeStatus();
setInterval(checkYouTubeStatus, 600000);
