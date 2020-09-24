const getLolStat = require('../module/getLolStat');
const DiscordEmbed = require('../module/DiscordEmbed');
const Discord = require('discord.js');
const { prefix, name, colour, avatarURI, URI } = require('../config.json');

module.exports = {
    name: "lol",
    use: "lol username",
    description: "봇이 username의 롤 정보를 알려줍니다. 현재 티어기능만 지원됩니다.",
    args: true,
    guildOnly: false,
    execute(message,args) {
        try {
            let jsonData = getLolStat.getLolData(args.join(' '));
            if(!jsonData) {
                return message.channel.send(DiscordEmbed.createEmbedDescription(`배치 결과가 없거나 유저 정보를 가져올 수 없습니다.`));
            }
            let discordEmbed = new Discord.MessageEmbed()
            .setColor(colour).setTitle(`${args.join(' ')}의 롤 전적`).setAuthor(`${name}`,avatarURI,URI)
            .setDescription(`${args.join(' ')}의 롤 전적`).setThumbnail(avatarURI).addFields(jsonData).setTimestamp()
            .setFooter('개발자는 2tle', avatarURI);
            if (message.channel.type === 'dm') {
                message.author.send(discordEmbed);
            } else {
                message.channel.send(discordEmbed);
            }
        } catch (error) {
            console.log(error);
            return message.channel.send(DiscordEmbed.createEmbedDescription(`배치 결과가 없거나 유저 정보를 가져올 수 없습니다.`));
        }
    }
};