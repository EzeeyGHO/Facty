const Discord = require("discord.js")
const prefix = require("../config.json")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    const wrong = client.emojis.cache.get("829410868806287411")
    const wrongName = client.emojis.cache.find(e => e.name === wrong.name)
    const truth = client.emojis.cache.get("829410846819090541")
    const truthName = client.emojis.cache.find(e => e.name === truth.name)
    let messageDelete = parseInt(args[0])
    if(isNaN(messageDelete)) return message.channel.send(`${wrong} Please put a valid number !`)
    if(messageDelete > 100) {
        return message.channel.send(`${wrong} Please put a number between 2 and 100 !`)
    }
    if(messageDelete < 2) {
        return message.channel.send(`${wrong} Please put a number between 2 and 100 !`)
    }
    message.channel.bulkDelete(messageDelete, true)
    const cleared = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setDescription(`${truthName} ${messageDelete} messages was deleted !`)
    message.channel.send(cleared).then(msg => msg.delete({timeout: 5000}));
}

module.exports.help = {
    name: "clear"
}