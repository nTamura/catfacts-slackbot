require('dotenv').config()

const Bot = require('slackbots')

const settings = {
  token: process.env.TOKEN,
  name: 'Catfacts'
}

console.log(settings);
