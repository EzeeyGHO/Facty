const Discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db")

module.exports.run = (client, message, args) => {
    const targetChannel = message.channel.id
    const Channelset = db.get(`welcome_${message.guild.id}`)
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${wrong} Permission missing !`)
    const embed = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setDescription(`${truth} Welcome channel has been set !`)
    message.channel.send(embed)
    db.set(`welcome_${message.guild.id}`, targetChannel)
}

module.exports.help = {
    name: 'set-welcome'
}