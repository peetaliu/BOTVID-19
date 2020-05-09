const Discord = require('discord.js')
const { prefix } = require('./config.json')
const client = new Discord.Client()
require('dotenv').config()

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return

  const args = msg.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'sunny') {
    msg.channel.send(`@${msg.author.username} hrrrro burddy`)
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
