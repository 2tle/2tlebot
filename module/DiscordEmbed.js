const Discord = require('discord.js');
const { colour, email } = require('../config.json');
module.exports = {
    createEmbedDescription: function(errorMessage){
        const Embed = new Discord.MessageEmbed().setDescription(errorMessage).setColor(colour);
        return Embed;
    }
}