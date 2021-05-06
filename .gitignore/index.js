const Discord = require("discord.js")
const db = require("quick.db")
const fs = require("fs")
const config = require("./config.json")

const client = new Discord.Client()

const map = new Map()

const Canvacord = require("canvacord")
const Canvas = require("canvas")
const message = require("./Events/message")

client.on("ready", () => {
  client.user.setActivity(`in ${client.guilds.cache.size} servers | ${config.prefix}help & ${config.prefix}new`)
})

const activities_list = [
  `${config.prefix}help`, 
  `${config.prefix}new`,
  "with Subty", 
  ];
  
  client.on('ready', () => {
      setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
          client.user.setActivity(`in ${client.guilds.cache.size} servers | ${activities_list[index]}`); 
      }, 10000);
  });

client.on("message", async message => {

        if(message.author.bot) return
        if(message.content.startsWith(config.prefix)) return
        const random = Math.floor(Math.random() * 10) + 5
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, random)
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, random)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var neededXP = level * 500
        if(neededXP < xp) {
            const rankEmojie = client.emojis.cache.get("829410826276044881")
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, neededXP)
            message.channel.send(`${rankEmojie} Congrats, ${message.author} you passt level ${newLevel}`)
        }

    if(message.content.includes("https://discord.gg/")) {
      const wrong = client.emojis.cache.get("829410868806287411")
      if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete()
        message.channel.send(`${wrong} Please stop send invite !`)
      }
    }

    if(message.content.includes("@everyone")) {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete()
        const wrong = client.emojis.cache.get("829410868806287411")
        message.channel.send(`${wrong} Please don't everyone !`)
      } else {
        return
      }
    }

    if(message.content.includes("@here")) {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete()
        const wrong = client.emojis.cache.get("829410868806287411")
        message.channel.send(`${wrong} Please don't here !`)
      } else {
        return
      }
    }

    if(map.has(message.author.id)) {
      if(message.member.hasPermission("ADMINISTRATOR")) return
      const userData = map.get(message.author.id)
      let messagesCount = map.get(message.author.id).messagesCount;
      const {lastMessage, timer} = userData
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      if(difference > 2500) {
        clearTimeout(timer)
        userData.messagesCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
           
        }, 5000)
        map.set(message.author.id, userData )
      } else {
      ++messagesCount;
      if(parseInt(messagesCount) === 5) {
        const truth = client.emojis.cache.get("829410846819090541")
        const warnings = db.get(`warnings_${message.guild.id}_${message.author.id}`);
        db.add(`warnings_${message.guild.id}_${message.author.id}`, 1);
        message.channel.send(`${truth} ${message.author.username} has been warned for spamming !`)
        if(warnings === 3) message.member.kick()

      } else {
        userData.messagesCount = messagesCount
        map.set(message.author.id, userData)
      }
      }
    } else {
      let fn = setTimeout(() => {
        map.delete(message.author.id)
      }, 5000)
      map.set(message.author.id, {
        messagesCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
})

client.commands = new Discord.Collection();
fs.readdir("./Commandes/", (error, f) => {
  if(error) console.log(error);

  let commandes = f.filter(f => f.split(".").pop() === "js");
  if(commandes.length <= 0) return console.log("aucune commande trouvé dans le dossier");

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} commande chargée !`);
    client.commands.set(commande.help.name, commande);
  });
});

fs.readdir("./Events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach((f) => {
      const events = require(`./Events/${f}`);
      const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
  });

});

client.on("guildMemberAdd", member => {
  
  const info = client.emojis.cache.get("830746721633173505")
  const ChannelWelcome = db.get(`welcome_${member.guild.id}`)
  const welcome = member.guild.channels.cache.get(ChannelWelcome)
  if(!welcome) return
  const welcomeEmbed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.username} welcome to our server !`, member.user.displayAvatarURL())
  .setColor("#ff6156")
  welcome.send(welcomeEmbed)

  var ChannelLog = db.get(`log_${member.guild.id}`)
  let log = member.guild.channels.cache.get(ChannelLog)
  if(!log) return
  const logEmbed = new Discord.MessageEmbed()
  .setDescription(`${info} ${member.user.username} join the server !`)
  .setTimestamp()
  .setFooter(`We are now ${member.guild.memberCount} members !`)
  .setColor(config.joinColor)
  log.send(logEmbed)
  
  let rolez = member.guild.roles.cache.get("829377013051424828")
  if(!rolez) return
  member.roles.add(rolez)
})

client.on("guildMemberRemove", member => {

  const ChannelGoodbye = db.get(`goodbye_${member.guild.id}`)
  const goodbye = member.guild.channels.cache.get(ChannelGoodbye)
  if(!goodbye) return
  const goodbyeEmbed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.username} leave our server !`, member.user.displayAvatarURL())
  .setColor("#ff6156")
  welcome.send(goodbyeEmbed)

  const info = client.emojis.cache.get("830746721633173505")
  var ChannelLog = db.get(`log_${member.guild.id}`)
  let log = member.guild.channels.cache.get(ChannelLog)
  if(!log) return
  const logEmbed = new Discord.MessageEmbed()
  .setDescription(`${info} ${member.user.username} leave the server !`)
  .setTimestamp()
  .setFooter(`We are now ${member.guild.memberCount} members !`)
  .setColor(config.leaveColor)
  log.send(logEmbed)
})

client.on("message", message => {
  if(message.content === "test") {
    client.guilds.cache.filter(guild => {
    console.log(guild.name + "(" + guild.memberCount + ")")
    })
  }
})

client.login("ODI3NTk2MTI4MjA3MjQxMjQ3.YGdU9A.7gUPg4oSeU_DudtO785gkdZixhg")