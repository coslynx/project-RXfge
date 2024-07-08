const pauseCommand = (message, serverQueue) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send('You need to be in a voice channel to pause the music!');
    }
    if (!serverQueue) {
        return message.channel.send('There is no song currently playing to pause!');
    }
    if (serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        message.channel.send('Music paused!');
    } else {
        message.channel.send('The music is already paused!');
    }
};

module.exports = pauseCommand;