'use strict';

require('dotenv').config()

const Bot = require('slackbots')
const catFacts = require('cat-facts');

const settings = {
  token: process.env.TOKEN,
  name: 'Catfacts'
}

let randomFact = catFacts.random();
let allFacts = catFacts.all;

// console.log(randomFact);
// console.log(allFacts);

const bot = new Bot(settings)

bot.on('start', function() {
  const params = {
    icon_emoji: ':cf:'
  };

    // console.log(bot.getUsers())
    // bot.postMessageToUser('ntamura', randomFact, params);
    // bot.postMessageToChannel('general', 'meow!', params);
    // bot.postMessageToGroup('testing', randomFact, params);
})

// bot.on('message', function(data) {
//     // all ingoing events https://api.slack.com/rtm
//     console.log(data);
// });
