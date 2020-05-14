module.exports = {
  name: 'camel',
  execute(msg, args) {
    const msgArr = msg.content.split('')
    console.log(msgArr)
    const upCase = Math.floor(msgArr.length / 2)
    console.log(msgArr.map(l => l.toString().toUpperCase()))
  },
}
