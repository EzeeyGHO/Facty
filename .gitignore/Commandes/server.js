const Discord = require("discord.js")
const prefix = require("../config.json")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setAuthor(`${message.author.username} here is ${message.guild.name} stats !`)
    .setThumbnail(message.guild.iconURL())
    .addField("Members", `${message.guild.memberCount} members`, true)
    .addField("Channels", `${message.guild.channels.cache.size} channels`, true)
    message.channel.send(embed)
}

module.exports.help = {
    name: "server"
}   