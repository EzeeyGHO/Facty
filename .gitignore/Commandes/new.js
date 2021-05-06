const Discord = require("discord.js")
const {prefix} = require("../config.json")
const fs = require("fs")
const db = require("quick.db")

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setAuthor(`${client.user.username}, news !`)
    .setDescription(`__New addition__ : \n
    ${prefix}bot - To see all the creator bot and to be aware of new bots !\n${prefix}set-goodbye - To complete the set-welcome with a set-goodbye !\n
    To suggest new addition go and the server and proposes : \nhttps://discord.gg/XnQz7A925N`)
    .setFooter("News - 5 mai 2021")
    message.channel.send(embed)
}

module.exports.help = {
    name: 'new'
}