

module.exports = {
    name: "avt",
    use: "avt",
    description: "봇이 당신의 프로필 사진을 건네줍니다.",
    args: false,
    guildOnly: false,
    execute(message,args) {
        message.reply(message.author.displayAvatarURL());
    }
};