const DiscordEmbed = require('../module/DiscordEmbed.js');
module.exports = {
    name: 'nowplaying',
    use: 'nowplaying',
    description: '봇이 재생중인 노래를 보여줍니다.',
    args: false,
    guildOnly:true,
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(DiscordEmbed.createEmbedDescription(`현재 재생중인게 없습니다만,`));
		return message.channel.send(DiscordEmbed.createEmbedDescription(`현재 재생중: ${serverQueue.songs[0].title}`));
    },
};