const getPubg = require('../module/getPubg');
const DiscordEmbed = require('../module/DiscordEmbed');
const Discord = require('discord.js');
const { prefix, name, colour, avatarURI, URI } = require('../config.json');

module.exports = {
    name: "pubg",
    use: "pubg platform username",
    description: "platform: steam, kakao, 봇이 platform의 username의 배그 전적을 가져옵니다.",
    args: true,
    guildOnly: false,
    execute(message, args) {
        if(args[0] != 'steam' && args[0] != 'kakao') {
            return DiscordEmbed.createEmbedDescription('알맞은 플랫폼을 입력해주세요. 플랫폼은 steam, kakao만 지원합니다');
        } else if (!args[1]){
            return DiscordEmbed.createEmbedDescription('이름이 비어 있습니다');
        }
        try {
            let data = getPubg.getPubg(args[0], args[1]);
            if(!data) {
                return message.channel.send(DiscordEmbed.createEmbedDescription(`유저 정보를 가져올 수 없습니다.`));
            }
            let discordEmbed = new Discord.MessageEmbed()
            .setColor(colour).setTitle(`${args.join(' ')}의 배그 전적`).setAuthor(`${name}`,avatarURI,URI)
            .setDescription(`현재 솔로/듀오/스쿼드 TPP만 지원합니다.`).setThumbnail(avatarURI).addFields(data).setTimestamp()
            .setFooter('개발자는 2tle', avatarURI);
            if (message.channel.type === 'dm') {
                message.author.send(discordEmbed);
            } else {
                message.channel.send(discordEmbed);
            }
        } catch (err) {
            console.log(err);
            return message.channel.send(DiscordEmbed.createEmbedDescription(`유저 정보를 가져올 수 없습니다.`));
        }
        
    }
};