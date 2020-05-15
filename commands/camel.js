module.exports = {
  name: 'camel',
  execute(msg, args) {
    console.log(`Message: ${msg.content} Sent by: ${msg.author.id}`)
    const convertString = str => {
      let convStr = str.split('')
      if (str.length === 1) {
        return convStr
      }
      if (str.length < 4) {
        const up = Math.floor(Math.random() * (str.length - 1) + 1)
        convStr[up] = convStr[up].toUpperCase()
        return convStr.join('')
      }

      let posUp = []
      for (i = 0; i < str.length - 1; i++) {
        posUp[i] = i + 1
      }
      console.log('initial posUp', posUp)
      for (i = 0; i < Math.floor(str.length / 2); i++) {
        const up = Math.floor(Math.random() * posUp.length)
        convStr[posUp[up]] = convStr[posUp[up]].toUpperCase()
        posUp.splice(up, 1)
        console.log('posUp', posUp)
      }
      return convStr.join('')
    }

    const msgArr = msg.content.toLowerCase().split(' ')
    msg.channel.send(msgArr.map(s => convertString(s)).join(' '))
  },
}
