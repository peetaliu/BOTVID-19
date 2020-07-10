module.exports = {
  name: 'cases',
  execute(msg, args) {
    const axios = require('axios')
    const baseURL = 'https://api.covid19api.com/'
    const date = new Date()
    const datePrev = new Date()
    datePrev.setDate(date.getDate() - 1)
    date.setUTCHours(0, 0, 0, 0)
    datePrev.setUTCHours(0, 0, 0, 0)

    console.log('date: ', date.toISOString())
    console.log('datePrev: ', datePrev.toISOString())

    const current = async country => {
      const request = await axios.get(
        `${baseURL}total/country/${country}?from=${datePrev.toISOString()}&to=${date.toISOString()}`
      )
      return request.data
    }
    let cases = {}
    current(args).then(res => {
      cases = {
        conf: res[0].Confirmed,
        deaths: res[0].Deaths,
        recov: res[0].Recovered,
        active: res[0].Active,
        date: res[0].Date,
      }
      console.log('cases in promise: ', cases)
      msg.channel.send(
        `Covid-19 cases in ${args} as of ${cases.date}: \nConfirmed: ${cases.conf}\nDeaths: ${cases.deaths}\nRecovered: ${cases.recov}\nActive: ${cases.active}`
      )
    })
  },
}
