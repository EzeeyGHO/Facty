const Discord = require("discord.js")
const db = require("quick.db")
const message = require("../Events/message")

const client = new Discord.Client()

module.exports.run  = (client, message, args) => {
    const targetChannel = message.channel.id
    var Channelset = db.get(`log_${message.guild.id}`)
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${wrong} Permission missing !`)
    const embed = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setDescription(`${truth} Log channel has been set !`)
    message.channel.send(embed)
    db.set(`log_${message.guild.id}`, targetChannel)
}

module.exports.help = {
    name: "set-log"
}