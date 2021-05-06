const Discord = require("discord.js")
const {prefix} = require("../config.json")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setAuthor(`${message.author.username}, here is the commands !`)
    .setDescription(`__Moderator commands__ : \n
    clear <amount>\nban <user>\nkick <user>\nwarn <user>\nunban <user_id>\n
    __Other commands__ : \n
    rank\nwarnings\nserver\nbuild-embed\nbot\n
    __Settings channels__ : \n
    set-welcome\nset-log\nset-goodbye\n
    __Support__ : \n
    https://discord.gg/haCCCKtu4X\n
    Use prefix : ${prefix}`)
    message.channel.send(embed)
}

module.exports.help = {
    name: "help"
}