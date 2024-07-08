const { playSong, queue } = require('../services/musicService');

module.exports = {
  name: 'queue',
  description: 'Display the current queue of songs',

  execute(message, args) {
    const serverQueue = queue.get(message.guild.id);

    if (!serverQueue || serverQueue.songs.length === 0) {
      return message.channel.send('There are no songs in the queue.');
    }

    let response = 'Current Queue:\n';

    serverQueue.songs.forEach((song, index) => {
      response += `${index + 1}. ${song.title}\n`;
    });

    return message.channel.send(response);
  },
};