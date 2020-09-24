const getCov = require('../module/getCov');
const DiscordEmbed = require('../module/DiscordEmbed.js');
const Discord = require('discord.js');
const moment = require('moment');
const { prefix, name, colour, avatarURI, URI } = require('../config.json');

module.exports = {
    name: "corona",
    use: "corona",
    description: "봇이 코로나19바이러스감염증 정보를 가져옵니다.",
    args: false,
    guildOnly: false,
    execute(message, args) {
        try {
            const covData = getCov.getCov();
            let discordEmbed = new Discord.MessageEmbed()
            .setColor(colour)
            .setTitle(`코로나19 정보`)
            .setAuthor(`${name}`, avatarURI, URI)
            .setDescription(`${moment().format("YYYY-MM-DD hh:mm")} 기준`)
            .setThumbnail(avatarURI)
            .addFields(
                { name: "일일 확진자", value: covData.hwakjin+"명" },
                { name: "일일 해외감염자", value: covData.haewae+"명" },
                { name: "전체 감염자", value: covData.all+"명" },
                { name: "격리해제", value: covData.wanchi+"명" },
                { name: "치료 중", value: covData.healing+"명" },
                { name: "사망", value: covData.death+"명" },
                
            )
            .setTimestamp()
            .setFooter('개발자는 2tle', avatarURI);
        if (message.channel.type === 'dm') {
            message.author.send(discordEmbed);
        } else {
            message.channel.send(discordEmbed);
        }
        } catch (err) { 
            message.channel.send(DiscordEmbed.createEmbedDescription(`코로나19정보를 불러올 수 없습니다.`));
        }

    }
};