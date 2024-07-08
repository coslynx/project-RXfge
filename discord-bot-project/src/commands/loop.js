const playMusic = require('../services/musicService');

module.exports = {
    name: 'loop',
    description: 'Enable or disable looping of the current song',

    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no song currently playing.');
        }

        serverQueue.loop = !serverQueue.loop;
        message.channel.send(`Looping is now ${serverQueue.loop ? 'enabled' : 'disabled'}.`);
    }
};