const Discord = require("discord.js")
const {banColor} = require("../config.json")
const db = require("quick.db")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    var ChannelLog = db.get(`log_${message.guild.id}`)
    let log = message.guild.channels.cache.get(ChannelLog)
    const user = message.mentions.users.first()
    const info = client.emojis.cache.get("830746721633173505")
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${wrong} Permission missing !`)
    if(user === client.user) return message.channel.send(`${wrong} I can't unwarn myself !`)
    if(!user) return message.channel.send(`${wrong} Please mention a user to unwarn !`)
    
    if(user) {
        var warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        const warnEmbed = new Discord.MessageEmbed()
        if(warnings === null) {
            message.channel.send(`${wrong} ${user.username} have no warn !`)
        }

        if(warnings !== null){
            db.delete(`warnings_${message.guild.id}_${user.id}`)
            message.channel.send(`${truth} ${user.username} warns has been reset !`)
        }
    } else {
        return message.channel.send(`${wrong} Please mention a user to warn !`)
    }
}

module.exports.help = {
    name: "unwarn"
}