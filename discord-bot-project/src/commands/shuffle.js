const shuffle = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.channel.send('You need to be in a voice channel to use this command!');
  }

  if (!serverQueue) {
    return message.channel.send('There is no song currently playing to shuffle!');
  }

  const { songs } = serverQueue;
  for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }

  serverQueue.songs = songs;
  message.channel.send('Queue has been shuffled!');
};

module.exports = shuffle;