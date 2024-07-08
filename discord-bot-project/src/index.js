const Discord = require('discord.js');
const { prefix, token } = require('../config/discordConfig');
const play = require('./commands/play');
const pause = require('./commands/pause');
const skip = require('./commands/skip');
const queue = require('./commands/queue');
const volume = require('./commands/volume');
const loop = require('./commands/loop');
const shuffle = require('./commands/shuffle');
const lyrics = require('./commands/lyrics');
const musicAPI = require('./interfaces/musicAPI');
const discordAPI = require('./interfaces/discordAPI');
const userCommands = require('./interfaces/userCommands');
const musicService = require('./services/musicService');
const userService = require('./services/userService');
const errorHandlingService = require('./services/errorHandlingService');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error while executing the command.');
  }
});

client.login(token);