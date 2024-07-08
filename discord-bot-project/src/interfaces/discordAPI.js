const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { prefix, token } = require('../../config/discordConfig');
const { play, pause, skip, queue, volume, loop, shuffle, lyrics } = require('../commands');

const client = new Discord.Client();
const queue = new Map();

client.once('ready', () => {
    console.log('Bot is online!');
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
        play(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}pause`)) {
        pause(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}queue`)) {
        queue(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}volume`)) {
        volume(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}loop`)) {
        loop(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}shuffle`)) {
        shuffle(message, serverQueue);
    } else if (message.content.startsWith(`${prefix}lyrics`)) {
        lyrics(message, serverQueue);
    } else {
        message.channel.send('Invalid command. Please use valid commands.');
    }
});

client.login(token);