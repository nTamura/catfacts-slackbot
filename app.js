// 'use strict';

require('dotenv').config()

const Bot = require('slackbots')
const catFacts = require('cat-facts');

const settings = {
  token: process.env.TOKEN,
  name: 'Catfacts'
}
const params = {
    icon_emoji: ':cf:'
  };

let randomFact = catFacts.random();
let allFacts = catFacts.all;

const bot = new Bot(settings)

// bot.on('start', function() {
//   console.log('Catfacts server running...');
//   // console.log(bot.getUsers())
//   // bot.postMessageToUser('ntamura', randomFact, params);
//   // bot.postMessageToChannel('', randomFact, params);
//   // bot.postMessageToGroup('testing', randomFact, params);
// })

bot.on('message', function(data) {
  if (data.type === "desktop_notification") {
    let text = data.content
    let arg = /([\/])\w+/.exec(text);

    if (arg[0]) {
      switch(arg[0]) {
        case "/facts":
          // console.log('/fact!');
          bot.postMessageToGroup('testing', randomFact, params);
          break;
        default:
          console.log('default');
      }
    } else {
      console.log('error');
    }

  }

});
