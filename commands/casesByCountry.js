module.exports = {
  name: 'cases',
  execute(msg, args) {
    const axios = require('axios')
    const baseURL = 'https://api.covid19api.com/'

    axios.get(`${baseURL}total/country/${args}`).then(req => {
      const cases = req.data[req.data.length - 1]
      const fDate = new Date(cases.Date).toDateString()
      msg.channel.send(
        `COVID-19 cases in ${cases.Country} as of ${fDate}: \nConfirmed: ${cases.Confirmed}\nDeaths: ${cases.Deaths}\nRecovered: ${cases.Recovered}\nActive: ${cases.Active}`
      )
    })
  },
}
