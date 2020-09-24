const DiscordEmbed = require('../module/DiscordEmbed.js');
module.exports = {
	name: 'stop',
	description: '봇이 재생중인 노래를 stop합니다',
    use: 'stop',
    args: false,
    guildOnly:true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send(DiscordEmbed.createEmbedDescription(`음성 채널에 접속하여야 합니다.`));
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
        message.channel.send(DiscordEmbed.createEmbedDescription(`stop 완료.`));
	},
};