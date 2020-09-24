const DiscordEmbed = require('../module/DiscordEmbed.js');
module.exports = {
	name: 'skip',
	description: '봇이 재생중인 노래를 skip합니다',
    use: 'skip',
    args: false,
    guildOnly:true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send(DiscordEmbed.createEmbedDescription(`음성 채널에 접속하여야 합니다.`));
		if (!serverQueue) return message.channel.send(DiscordEmbed.createEmbedDescription(`넘길 노래가 없습니다.`));
		serverQueue.connection.dispatcher.end();
        message.channel.send(DiscordEmbed.createEmbedDescription(`skip 완료.`));
	},
};