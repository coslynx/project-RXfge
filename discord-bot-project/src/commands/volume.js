const { Command } = require('discord.js');

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            aliases: ['vol'],
            description: 'Adjust the playback volume of the bot',
            usage: '<volume>',
            cooldown: 3,
            args: true,
            guildOnly: true,
            player: true
        });
    }

    async run(message, args) {
        const { channel } = message.member.voice;

        if (!channel) return message.channel.send('You need to be in a voice channel to use this command.');

        const queue = message.client.player.getQueue(message);

        if (!queue) return message.channel.send('There is no music playing.');

        const volume = parseInt(args[0], 10);

        if (isNaN(volume) || volume < 0 || volume > 100) {
            return message.channel.send('Please provide a valid volume level between 0 and 100.');
        }

        const success = message.client.player.setVolume(message, volume);

        if (success) {
            message.channel.send(`Volume set to ${volume}%`);
        } else {
            message.channel.send('There was an error setting the volume.');
        }
    }
};