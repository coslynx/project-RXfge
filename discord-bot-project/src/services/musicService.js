import discord from 'discord.js';
import { musicAPI } from '../interfaces/musicAPI';

const client = new discord.Client();

client.on('message', async message => {
  if (message.content.startsWith('!play')) {
    const args = message.content.split(' ');
    if (args.length === 1) {
      message.channel.send('Please provide a song name or URL to play.');
      return;
    }

    const query = args.slice(1).join(' ');

    try {
      const song = await musicAPI.searchSong(query);
      if (!song) {
        message.channel.send('No results found for the provided query.');
        return;
      }

      // Code for playing the song in the voice channel
      message.channel.send(`Now playing: ${song.title}`);
    } catch (error) {
      console.error('Error playing the song:', error);
      message.channel.send('An error occurred while playing the song. Please try again later.');
    }
  }
});

client.login('your-bot-token');