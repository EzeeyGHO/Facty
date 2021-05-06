const Discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db")

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setAuthor(`${message.author.username}, here is all creator bot`)
    .setDescription(`__Subty__ : \n
    I'm on a new bot called Subty. This bot is like fight game, semi-rpg ! I will try to stand out so as not to do an unusual bot !\n
    __Facty__ : \n
    This bot is created to ensure the protection of servers !`)
    message.channel.send(embed)
}

module.exports.help = {
    name: 'bot'
}