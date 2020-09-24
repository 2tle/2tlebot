const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const YTAPI = require('../module/getyt.js')
const { colour, email, YOUTUBE_DATA_API_KEY } = require('../config.json');

function createEmbedDescription(errorMessage) {
    const Embed = new Discord.MessageEmbed().setDescription(errorMessage).setColor(colour);
    return Embed;
}

module.exports = {
    name: 'play',
    use: 'play title',
    description: '봇이 노래를 재생합니다.',
    args: true,
    guildOnly: true,
    aliases: ['p'],
    async execute(message, args1) {
        try {
            console.log(args1[0]);
            const args = await YTAPI.getYT(args1[0]);
            const queue = message.client.queue;
            const serverQueue = message.client.queue.get(message.guild.id);
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return message.channel.send(createEmbedDescription('음성 채널에 접속하여 주세요.'));
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send(createEmbedDescription('권한이 없습니다. :/'));
            const songInfo = await ytdl.getInfo(args);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
            if (!serverQueue) {
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [song],
                    volume: 5,
                    playing: true,
                };

                try {
                    queue.set(message.guild.id, queueContruct);

                    //queueContruct.songs.push(song);
                    var connection = await voiceChannel.join();
                    queueContruct.connection = await connection;
                    this.play(message, queueContruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(
                        createEmbedDescription(
                            `오류발생: ${err}\n 운영자 ${email} 로 메일을 보내주세요.`
                        )
                    );
                }
            } else {
                
                if(serverQueue.songs.length == 0) {
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [song],
                        volume: 5,
                        playing: true,
                    };
                    try {
                        queue.set(message.guild.id, queueContruct);

                        //queueContruct.songs.push(song);
                        var connection = await voiceChannel.join();
                        queueContruct.connection = await connection;
                        serverQueue.songs.push(song);
                        this.play(message, queueContruct.songs[0]);
                        return;

                    } catch (er1) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(
                            createEmbedDescription(
                                `오류발생: ${err}\n 운영자 ${email} 로 메일을 보내주세요.`
                            )
                        );
                    }
                    
                } else {
                    serverQueue.songs.push(song);
                    return message.channel.send(
                        createEmbedDescription(`${song.title}을 Queue에 추가했습니다.`)
                    );
                }
                
            }
        } catch (error) {
            console.log(error);
            message.channel.send(
                createEmbedDescription(
                    `오류발생: ${error.message}\n 운영자 ${email} 로 메일을 보내주세요.`
                )
            );
        }



    },
    play(message, song) {
        const queue = message.client.queue;
        const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);

        if (!song) {
            //console.log(message);
            //serverQueue.voiceChannel.leave();
            //queue.delete(guild.id);
            //return;
        } else {
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url))
                .on('finish', () => {
                    serverQueue.songs.shift();
                    this.play(message, serverQueue.songs[0]);
                })
                .on('error', (error) => {
                    console.log(error);
                    message.channel.send(
                        createEmbedDescription(
                            `오류발생: ${error.message}\n 운영자 ${email} 로 메일을 보내주세요.`
                        )
                    );
                });
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(createEmbedDescription(`재생 시작: ${song.title}`));
        }
    },
};