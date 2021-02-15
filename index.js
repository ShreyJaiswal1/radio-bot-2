require("dotenv").config();
const express = require(`express`)
const app = express();
const port = 3000
app.get('/', (req, res) => res.send("Hey i'm online :D"))
app.listen(port, () =>
console.log(`your app is listening at https://localhost:${port}`)
);

const { TOKEN, CHANNEL, SERVER, STATUS, LIVE } = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', async () => {
  client.user.setActivity(STATUS + " 🎵")
  console.log(`successfully logged in as ${client.user.username}`)
  let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

  if (!channel) return;
  const connection = await channel.join();
  connection.play(ytdl(LIVE), {quality: `highestaudio`}, {volume: `120`})
})

setInterval(async function() {
  if (!client.voice.connections.get(SERVER)) {
    let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)
    if (!channel) return;

    const connections = await channel.join()
    connections.play(ytdl(LIVE), {quality: `highestaudio`}, {volume: `120`})
  }
}, 20000)

client.login(process.env.TOKEN)