module.exports = {
  name: 'hello',
  execute(msg, args) {
    msg.channel.send(`<@${msg.author.id}> hrrrroh burddy`)
  },
}
