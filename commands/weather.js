const getWeather = require('../module/getWeather.js');
const DiscordEmbed = require('../module/DiscordEmbed.js');
const Discord = require('discord.js');
const { prefix, name, colour, avatarURI, URI } = require('../config.json');
module.exports = {
    name: "wt",
    use: "wt location",
    description: "봇이 Location의 날씨 정보를 알려줍니다.",
    args: true,
    guildOnly: false,
    execute(message, args) {
        try {
            let location = args.join(' ');
            const weaterData = getWeather.getWT(location);
            let discordEmbed = new Discord.MessageEmbed()
                .setColor(colour)
                .setTitle(`${location} 날씨`)
                .setAuthor(`${name}`, avatarURI, URI)
                .setDescription(`${weaterData.location} 날씨`)
                .setThumbnail(avatarURI)
                .addFields(
                    { name: "위치", value: weaterData.location },
                    { name: "온도", value: weaterData.degree + '°C' },
                    { name: "날씨", value: weaterData.weather },
                    { name: "습도", value: weaterData.humidity },
                )
                .setTimestamp()
                .setFooter('개발자는 2tle', avatarURI);
            if (message.channel.type === 'dm') {
                message.author.send(discordEmbed);
            } else {
                message.channel.send(discordEmbed);
            }
        } catch (error) {
            message.channel.send(DiscordEmbed.createEmbedDescription(`날씨를 불러올 수 없습니다.`));
        }

    }
}