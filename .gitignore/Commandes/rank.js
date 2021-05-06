const Discord = require("discord.js")
const prefix = require("../config.json")
const Canvas = require("canvas")
const db = require("quick.db")
const client = new Discord.Client()

module.exports.run = async (client, message, args) => {
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
      
        let fontSize = 70;
      
        do {
          ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);
      
        return ctx.font;
      };

        if(message.author.bot) return
        var user = message.mentions.users.first() || message.author;
        var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0
        var currentXP = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0
        var neededXP = level * 500 + 500

    //current xp
        if(currentXP >= 1000 && currentXP <= 1099) currentXP = "1k"
        if(currentXP >= 1100 && currentXP <= 1199) currentXP = "1.1k"
        if(currentXP >= 1200 && currentXP <= 1299) currentXP = "1.2k"
        if(currentXP >= 1300 && currentXP <= 1399) currentXP = "1.3k"
        if(currentXP >= 1400 && currentXP <= 1499) currentXP = "1.4k"
        if(currentXP >= 1500 && currentXP <= 1599) currentXP = "1.5k"
        if(currentXP >= 1600 && currentXP <= 1699) currentXP = "1.6k"
        if(currentXP >= 1700 && currentXP <= 1799) currentXP = "1.7k"
        if(currentXP >= 1800 && currentXP <= 1899) currentXP = "1.8k"
        if(currentXP >= 1900 && currentXP <= 1999) currentXP = "1.9k"
        if(currentXP >= 2000 && currentXP <= 2099) currentXP = "2k"
        if(currentXP >= 2100 && currentXP <= 2199) currentXP = "2.1k"
        if(currentXP >= 2200 && currentXP <= 2299) currentXP = "2.2k"
        if(currentXP >= 2300 && currentXP <= 2399) currentXP = "2.3k"
        if(currentXP >= 2400 && currentXP <= 2499) currentXP = "2.4k"
        if(currentXP >= 2500 && currentXP <= 2599) currentXP = "2.5k"
        if(currentXP >= 2600 && currentXP <= 2699) currentXP = "2.6k"
        if(currentXP >= 2700 && currentXP <= 2799) currentXP = "2.7k"
        if(currentXP >= 2800 && currentXP <= 2899) currentXP = "2.8k"
        if(currentXP >= 2900 && currentXP <= 2999) currentXP = "2.9k"
        if(currentXP >= 3000 && currentXP <= 3099) currentXP = "3k"
        if(currentXP >= 3100 && currentXP <= 3199) currentXP = "3.1k"
        if(currentXP >= 3200 && currentXP <= 3299) currentXP = "3.2k"
        if(currentXP >= 3300 && currentXP <= 3399) currentXP = "3.3k"
        if(currentXP >= 3400 && currentXP <= 3499) currentXP = "3.4k"
        if(currentXP >= 3500 && currentXP <= 3599) currentXP = "3.5k"
        if(currentXP >= 3600 && currentXP <= 3699) currentXP = "3.6k"
        if(currentXP >= 3700 && currentXP <= 3799) currentXP = "3.7k"
        if(currentXP >= 3800 && currentXP <= 3899) currentXP = "3.8k"
        if(currentXP >= 3900 && currentXP <= 3999) currentXP = "3.9k"
        if(currentXP >= 4000 && currentXP <= 4099) currentXP = "4k"
        if(currentXP >= 4100 && currentXP <= 4199) currentXP = "4.1k"
        if(currentXP >= 4200 && currentXP <= 4299) currentXP = "4.2k"
        if(currentXP >= 4300 && currentXP <= 4399) currentXP = "4.3k"
        if(currentXP >= 4400 && currentXP <= 4499) currentXP = "4.4k"
        if(currentXP >= 4500 && currentXP <= 4599) currentXP = "4.5k"
        if(currentXP >= 4600 && currentXP <= 4699) currentXP = "4.6k"
        if(currentXP >= 4700 && currentXP <= 4799) currentXP = "4.7k"
        if(currentXP >= 4800 && currentXP <= 4899) currentXP = "4.8k"
        if(currentXP >= 4900 && currentXP <= 4999) currentXP = "4.9k"
        if(currentXP >= 5000 && currentXP <= 5099) currentXP = "5k"
        if(currentXP >= 5100 && currentXP <= 5199) currentXP = "5.1k"
        if(currentXP >= 5200 && currentXP <= 5299) currentXP = "5.2k"
        if(currentXP >= 5300 && currentXP <= 5399) currentXP = "5.3k"
        if(currentXP >= 5400 && currentXP <= 5499) currentXP = "5.4k"
        if(currentXP >= 5500 && currentXP <= 5599) currentXP = "5.5k"
        if(currentXP >= 5600 && currentXP <= 5699) currentXP = "5.6k"
        if(currentXP >= 5700 && currentXP <= 5799) currentXP = "5.7k"
        if(currentXP >= 5800 && currentXP <= 5899) currentXP = "5.8k"
        if(currentXP >= 5900 && currentXP <= 5999) currentXP = "5.9k"
        if(currentXP >= 6000 && currentXP <= 6099) currentXP = "6k"

      //Needed xp
        if(neededXP === 1000) neededXP = "1k"
        if(neededXP === 1500) neededXP = "1.5k"
        if(neededXP === 2000) neededXP = "2k"
        if(neededXP === 2500) neededXP = "2.5k"
        if(neededXP === 3000) neededXP = "3k"
        if(neededXP === 3500) neededXP = "3.5k"
        if(neededXP === 4000) neededXP = "4k"
        if(neededXP === 4500) neededXP = "4.5k"
        if(neededXP === 5000) neededXP = "5k"
        if(neededXP === 5500) neededXP = "5.5k"
        if(neededXP === 6000) neededXP = "6k"
        if(neededXP === 6500) neededXP = "6.5k"
        if(neededXP === 7000) neededXP = "7k"
        if(neededXP === 7500) neededXP = "7.5k"
        if(neededXP === 8000) neededXP = "8k"
        if(neededXP === 8500) neededXP = "8.5k"
        if(neededXP === 9000) neededXP = "9k"
        if(neededXP === 9500) neededXP = "9.5k"
        if(neededXP === 10000) neededXP = "10k"

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
      
        const background = await Canvas.loadImage('./wallpaper.jpg');
      
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      
        ctx.strokeStyle = "#74037b"
      
        ctx.strokeRect(0, 0, canvas.width, canvas.height)

        ctx.font = applyText(canvas, user.username);
        ctx.fillStyle = "#ff6156"
        ctx.fillText(user.username, canvas.width / 3, canvas.height / 3.7)

        ctx.font = "20px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(user.discriminator, canvas.width / 19, canvas.height / 1.8)

        ctx.font = "25px sans-serif"
        ctx.fillStyle = "#ff6156"
        ctx.fillText("Level :", canvas.width / 2.5, canvas.height / 2)

        ctx.font = "25px sans-serif"
        ctx.fillStyle = "#ff6156"
        ctx.fillText(level, canvas.width / 1.9, canvas.height / 2)

        ctx.font = "20px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(`[ ${currentXP}/${neededXP} ]`, canvas.width / 2.3, canvas.height / 1.5)

        const avatar = await Canvas.loadImage(user.displayAvatarURL({format: "jpg"}))
        ctx.drawImage(avatar, 15, 15, 100, 100)
      
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Rank-Card.png');

        message.channel.send(attachment)
}

module.exports.help = {
    name: "rank"
}