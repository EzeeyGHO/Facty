const Discord = require("discord.js")
const db = require("quick.db")
const prefix = require("../config.json")
const client = new Discord.Client()

module.exports.run = async(client, message, args) => {
    if(message.author.bot) return
    const creatorEmbedTools = new Discord.MessageEmbed()
    .setColor("#ff6156")
    .setAuthor("Welcome to the embed creator !")
    .setDescription(`__Available options : 10__\n
    🧷 Add an **author** to the embed\n💬 Add a **title** to the embed\n⛓ Add an **URL** to the embed\n📸 Add an **image** to the embed\n📔 Add a **description** to the embed\n⏱ Add a **timestamp** to the embed\n🌸 Add a **color** to the embed\n⚽ Add a **Footer** to the embed\n🏆 Add a **thumbnail** to the embed\n
    ✅ When you have finish creating your embed !`)
    const wrong = client.emojis.cache.get("829410868806287411")
    const truth = client.emojis.cache.get("829410846819090541")
    const time = client.emojis.cache.get("829691419412267028")
    let embedToEdit = new Discord.MessageEmbed()
    .setAuthor("Your work place")

    let embedEdited = await message.channel.send(embedToEdit)

    const messageWait = await message.channel.send(`${time} Please wait all reactions !`)
    await Promise.all([`🧷`, `💬`, `⛓`, `📸`, `📔`, `⏱`, `🌸`, `⚽`, `🏆`, `✅`].map(r => messageWait.react(r)))
    await messageWait.edit(creatorEmbedTools)

    const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot
    const filterMessage = (m) => m.author.id===message.author.id&&!message.author.bot
    const collectorReaction1 = await new Discord.ReactionCollector(messageWait, filterReaction)
    collectorReaction1.on("collect", async reaction => {
        switch(reaction.emoji.name) {
        case `🧷`:
            const messageQuestionAuthor = await message.channel.send(`${truth} Please write a author !`)
            const authorEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            messageQuestionAuthor.delete()
            embedToEdit.setAuthor(authorEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `💬`:
            const messageQuestionTitle = await message.channel.send(`${truth} Please write a title !`)
            const titleEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            messageQuestionTitle.delete()
            embedToEdit.setTitle(titleEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `⛓`:
            const messageQuestionURL = await message.channel.send(`${truth} Please put an URL for the title!`)
            const URLEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            if(!URLEmbed.includes("http") || !URLEmbed.includes("https")) return message.channel.send(`${wrong} Please put an URL not text !`)
            messageQuestionURL.delete()
            embedToEdit.setURL(URLEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `📸`:
            const messageQuestionImage = await message.channel.send(`${truth} Please load an image !`)
            const imageEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            if(!imageEmbed.includes("http") || !imageEmbed.includes("https")) return message.channel.send(`${wrong} Please put an URL not text !`)
            messageQuestionImage.delete()
            embedToEdit.setImage(imageEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `📔`:
            const messageQuestionDescription = await message.channel.send(`${truth} Please write a description !`)
            const descriptionEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
            messageQuestionDescription.delete()
            embedToEdit.setDescription(descriptionEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `⏱`:
            embedToEdit.setTimestamp()
            embedEdited.edit(embedToEdit)
        break;
        case `🌸`:
            const messageQuestionColor = await message.channel.send(`${truth} Please put the color !`)
            const colorEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            messageQuestionColor.delete()
            embedToEdit.setColor(colorEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `⚽`:
            const messageQuestionFooter = await message.channel.send(`${truth} Please write a footer !`)
            const footerEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            messageQuestionFooter.delete()
            embedToEdit.setFooter(footerEmbed)
            embedEdited.edit(embedToEdit)
        break;
        case `🏆`:
            const messageQuestionThumbnail = await message.channel.send(`${truth} Please put a thumbnail !`)
            const thumbnailEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
            if(!thumbnailEmbed.includes("http") || !thumbnailEmbed.includes("https")) return message.channel.send(`${wrong} Please put an URL not text !`)
            messageQuestionThumbnail.delete()
            embedToEdit.setThumbnail(thumbnailEmbed)
            embedEdited.edit(embedToEdit)
            break;
            case `✅`:
                const messageQuestionChannelID = await message.channel.send(`${truth} For sending you're embed, you need to get the ID of the channel and put it here !`)
                const channelIDEmbed = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                const king = message.guild.channels.cache.get(channelIDEmbed)
                if(!king) return message.channel.send(`${wrong} Please put a correct channel !`)
                king.send(embedToEdit)
            break;
        }
    })
}

module.exports.help = {
    name: "build-embed"
}