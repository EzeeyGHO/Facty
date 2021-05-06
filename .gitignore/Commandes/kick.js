const Discord = require("discord.js")
const db = require("quick.db")
const {kickColor} = require("../config.json")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    var ChannelLog = db.get(`log_${message.guild.id}`)
    let log = message.guild.channels.cache.get(ChannelLog)
    const user = message.mentions.users.first()
    const info = client.emojis.cache.get("830746721633173505")
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    const truthName = client.emojis.cache.find(e => e.name === truth.name)
    if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`${wrong} Permission missing !`)
    if(user === client.user) return message.channel.send(`${wrong} I can't kick myself !`)
    if(user === message.author) {
        return message.channel.send(`${wrong} You can't kick yourself !`)
    }
    if(!user) return message.channel.send(`${wrong} Please mention a user to kick !`)
    if(user) {
        const members = message.guild.members.resolve(user)
        if(members) {
            members.kick()
            const kickEmbed = new Discord.MessageEmbed()
            .setColor("#ff6156")
            .setDescription(`${truthName} ${user.username} was sucessfully kicked !`)
            message.channel.send(kickEmbed)

            const kickLogEmbed = new Discord.MessageEmbed()
            .setColor(kickColor)
            .setDescription(`${info} ${user.username} has been kicked !`)
            .setTimestamp()
            .setFooter(`By ${message.author.username}`)
            log.send(kickLogEmbed)
        } else {
            return message.channel.send(`${wrong} This member is not in the guild !`)
        }
    }
}

module.exports.help = {
    name: "kick"
}