const { VoiceChannel, MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play music in a voice channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to play music!');
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');
        }

        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            const queueConstructor = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };

            message.client.queue.set(message.guild.id, queueConstructor);
            queueConstructor.songs.push(song);

            try {
                const connection = await voiceChannel.join();
                queueConstructor.connection = connection;
                this.play(message, queueConstructor.songs[0]);
            } catch (err) {
                console.error(err);
                message.client.queue.delete(message.guild.id);
                return message.channel.send(`Error: ${err}`);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
    },

    play(message, song) {
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
            queue.voiceChannel.leave();
            message.client.queue.delete(message.guild.id);
            return;
        }

        const dispatcher = queue.connection.play(ytdl(song.url))
            .on('finish', () => {
                queue.songs.shift();
                this.play(message, queue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        queue.textChannel.send(`Now playing: ${song.title}`);
    }
};