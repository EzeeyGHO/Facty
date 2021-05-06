const Discord = require("discord.js")
const db = require("quick.db")
const {unbanColor} = require("../config.json")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    var ChannelLog = db.get(`log_${message.guild.id}`)
    let log = message.guild.channels.cache.get(ChannelLog)
    const member = args[0] 
    const info = client.emojis.cache.get("830746721633173505")
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    const truthName = client.emojis.cache.find(e => e.name === truth.name)
    if(!message.member.hasPermission("BAN_MEMBERS","ADMINISTRATOR")) return message.channel.send(`${wrong} Permission missing !`)
    if(!member) {
        return message.channel.send(`${wrong} Please put a user ID to unban !`)
    }
    message.guild.fetchBans().then(bans => {
        if(bans.size === 0) return message.channel.send(`${wrong} No body is banned from your guild !`)
        const banUser = bans.find(b => b.user.id === member)
        if(!banUser) return message.channel.send(`${wrong} this person is not banned !`)
        message.guild.members.unban(banUser.user)
            const unbanned = new Discord.MessageEmbed()
            .setColor("#ff6156")
            .setDescription(`${truthName} ${member} was sucessfully unbanned !`)
            message.channel.send(unbanned)

            const unbannedLogChannel = new Discord.MessageEmbed()
            .setColor(unbanColor)
            .setDescription(`${info} ${member} has been unbanned !`)
            .setTimestamp()
            .setFooter(`By ${message.author.username}`)
            log.send(unbannedLogChannel)
    })
}

module.exports.help = {
    name: "unban"
}