const {prefix, name, colour, avatarURI, URI} = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    use: 'help',
    description: '모든 명령어를 보여줍니다.',
    aliases: ['cmd','commands','command'],
    guildOnly: false,
    args: false,
    execute(message,args) {
        const {commands} = message.client;
        const cmdData = JSON.parse(JSON.stringify(commands));
        let Arr = [];
        for(let i = 0; i < cmdData.length ; i++) {
            Arr.push({name: cmdData[i].use, value: cmdData[i].description});
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(colour)
        .setTitle(`${name} 도움말`)
        .setAuthor(`${name}`,avatarURI,URI)
        .setDescription(`${name}의 도움말을 보여줍니다.`)
        .setThumbnail(avatarURI)
        .addFields(Arr)
        .setTimestamp()
        .setFooter('개발자는 2tle',avatarURI);
        if(message.channel.type === 'dm') {
            message.author.send(Embed);
        } else {
            message.channel.send(Embed);
        }
    }
}