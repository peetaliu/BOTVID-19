module.exports = {
  name: 'compare',
  execute(msg, args) {
    const axios = require('axios')
    const Discord = require('discord.js')

    if (args.length !== 2) {
      msg.channel.send(
        'The compare command requires 2 different countries as arguments. \n(i.e. !compare USA Canada) \nPlease try again.'
      )
      return
    }

    const casesArr = []
    const baseUrl = 'https://api.covid19api.com/'

    const getCases = async country => {
      await axios.get(`${baseUrl}total/country/${country}`).then(req => {
        casesArr.push(req.data[req.data.length - 1])
      })
    }

    const appendArr = async () => {
      for (const cnt of args) {
        await getCases(cnt)
      }
    }

    const frmtNum = num => {
      return new Intl.NumberFormat().format(num)
    }

    appendArr()
      .then(() => {
        const compareTable = new Discord.MessageEmbed()
          .setColor('#0099FF')
          .setTitle(
            `Comparison of COVID-19 cases between ${casesArr[0].Country} and ${casesArr[1].Country}`
          )
          .addFields(
            {
              name: `${casesArr[0].Country}`,
              value: `\nConfirmed: ${frmtNum(casesArr[0].Confirmed)}\n
                Deaths: ${frmtNum(casesArr[0].Deaths)}\n
                Recovered: ${frmtNum(casesArr[0].Recovered)}\n
                Active: ${frmtNum(casesArr[0].Active)}`,
              inline: true,
            },
            {
              name: `${casesArr[1].Country}`,
              value: `\nConfirmed: ${frmtNum(casesArr[1].Confirmed)}\n
                Deaths: ${frmtNum(casesArr[1].Deaths)}\n
                Recovered: ${frmtNum(casesArr[1].Recovered)}\n
                Active: ${frmtNum(casesArr[1].Active)}`,
              inline: true,
            }
          )
        msg.channel.send(compareTable)
      })
      .catch(error => console.log(error))
  },
}
