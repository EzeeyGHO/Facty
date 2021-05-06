const Discord = require("discord.js")
const db = require("quick.db")
const {warnColor} = require("../config.json")
const client = new Discord.Client()

module.exports.run = async (client, message, args) => {
    var ChannelLog = db.get(`log_${message.guild.id}`)
    let log = message.guild.channels.cache.get(ChannelLog)
    const user = message.mentions.users.first()
    const info = client.emojis.cache.get("830746721633173505")
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    const truthName = client.emojis.cache.find(e => e.name === truth.name)
    var reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${wrong} Permission missing !`)
    if(user === client.user) return message.channel.send(`${wrong} You can't warn me !`)
    if(user === message.author) {
        return message.channel.send(`${wrong} You can't warn yourself !`)
    }
    if(user) {
        var warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        const warnEmbed = new Discord.MessageEmbed()
            .setColor("#ff6156")
            .setDescription(`${truthName} ${user.username} was sucessfully warned !`)
            message.channel.send(warnEmbed)

            const warnLogEmbed = new Discord.MessageEmbed()
            .setColor(warnColor)
            .setDescription(`${info} ${user.username} has been warned !`)
            .setTimestamp()
            .setFooter(`By ${message.author.username}`)
            log.send(warnLogEmbed)

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            db.set(`reason_${message.guild.id}_${user.id}`, reason);
        }
    } else {
        return message.channel.send(`${wrong} Please mention a user to warn !`)
    }
}

module.exports.help = {
    name: "warn"
}