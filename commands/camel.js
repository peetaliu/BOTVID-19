module.exports = {
  name: 'camel',
  execute(msg, args) {
    console.log(`Message: ${msg.content} Sent by: ${msg.author.id}`)
    const convertString = str => {
      let convStr = str.split('')
      let nonLett = []
      for (i = 0; i < convStr.length; i++) {
        if (!convStr[i].match(/^[a-zA-Z]+$/)) {
          nonLett.push({ char: convStr[i], pos: i })
          convStr[i] = ''
        }
      }
      console.log('nonLett', nonLett)
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
      nonLett.forEach(char => {
        convStr.splice(char.pos, 1, char.char)
      })
      return convStr.join('')
    }

    const checkSend = str => {
      const split = str.toString().split('')
      const send = split.some(l => /^[a-zA-Z]+$/g.test(l))
      console.log('send', send)
      return send
    }

    const msgArr = msg.content.toLowerCase().split(' ')
    if (!checkSend(msgArr)) {
      return
    }
    msg.channel.send(`\"${msgArr.map(s => convertString(s)).join(' ')}\"`)
  },
}
