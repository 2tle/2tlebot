const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/client.js');
const {token, prefix, name, colour, email } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const client = new Client();
client.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setStatus("dnd");
    client.user.setActivity(";help");
    console.log(`Login as ${client.user.tag}`);
});

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;
    if(command.guildOnly && message.channel.type === "dm") {
        const DiscordEmbed = new Discord.MessageEmbed()
        .setDescription('서버 전용 명령어 입니다.')
        .setColor(colour);
        return message.author.send(DiscordEmbed);
    }
    if(command.args && !args.length) {
        const DiscordEmbed = new Discord.MessageEmbed()
        .setDescription(`뒤에 뭔가 빠진거 같아요. ${prefix}help ${command.name} 으로 명령어를 확인해주세요.`).setColor(colour);
        if(message.channel.type ==="dm") return message.author.send(DiscordEmbed);
        else return message.channel.send(DiscordEmbed);
    }
    try { command.execute(message,args); } catch(err) {console.log(err); message.reply(`오류발생! 운영자에게 문의하세요. ${email}`)}
    
});
client.login(token);