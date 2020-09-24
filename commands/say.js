module.exports = {
    name: 'say',
    use: 'say text',
    description: '봇이 text를 보내줍니다.',
    args: true,
    guildOnly:false,
    execute(message, args) {
        message.channel.send(`${args.join(' ')}`);
    },
};