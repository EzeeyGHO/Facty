const Discord = require("discord.js")
const db = require("quick.db")
const prefix = require("../config.json")
const client = new Discord.Client()

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author
    let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);
        


        let reason = db.get(`reason_${message.guild.id}_${user.id}`) || "Unspecified"
        if(warnings === null) warnings = 0;
        const nowarns = new Discord.MessageEmbed()
        .setColor("#ff6156")
        .setAuthor(`${user.username} did'nt have any warn !`)

        const somewarns = new Discord.MessageEmbed()
        .setColor("#ff6156")
        .setAuthor(`${user.username} have ${warnings} warns !`)
        .setDescription(`Last warn reason : ${reason}`)

        if(warnings === 0 || warnings === null) {
            message.channel.send(nowarns)
        } else {
            message.channel.send(somewarns)
        }

}

module.exports.help = {
    name: "warnings"
}