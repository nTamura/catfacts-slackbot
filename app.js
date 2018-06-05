require('dotenv').config()

const Bot = require('slackbots')
const catFacts = require('cat-facts');

const settings = {
  token: process.env.TOKEN,
  name: 'Catfacts'
}

const bot = new Bot(settings)
const params = { icon_emoji: ':cf:'};
const channel = 'testing'

const openers = [
  '',
  'Did you know... ',
  'Catfact of the day! ',
  'Meow! ',
  'By the way... ',
  'Here is my favorite! ',
  'Strangely enough, ',
  'Listen to this one... ',
  'Haha! ',
  'This is good. ',
  'So many to choose from... ',
  'Hmmm... ',
  'Pawleaseee, ',
  'This is true. ',
  'I am fur real. ',
  'This is a purrfect fact! ',
  'Hissterical! ',
  'Paws what you are doing and listen to this. ',
  'You gotta be kitten me... ',
  'Meow meow. ',
  'Cat. I\'m a kitty cat. ',
  '',
  '',
]

let randOpen = () => {
 return openers[Math.floor(Math.random()*openers.length)]
}

// available functions
// catFacts.random();
// catFacts.all;

const getTime = () => {
  let time = new Date().toLocaleTimeString()
  let day = new Date().getDay()
  if ((time.includes('13:00')) && (day === 6)) {
    bot.postMessageToGroup(channel, `Happy Caturday! ${catFacts.random()}`, params)
  }
}

const handleMessage = (msg) => {
  if (msg.split(' ').length === 1) {
    bot.postMessageToGroup(channel, 'Meow?', params);
  } else if (msg.includes(' fact')) {
    bot.postMessageToGroup(channel, randOpen() + catFacts.random(), params);
  } else if (msg.includes(' help')) {
    bot.postMessageToGroup(channel, 'You can <@BB1EN3BNC> + "fact" to hear a random fact. Bot will also run every Sunday at 1PM.', params);
  } else {
    bot.postMessageToGroup(channel, 'No idea what you mean right meow. try typing "fact"', params);
  }
}

bot.on('start', () => {
  console.log('Catfacts server running');
  bot.postMessageToGroup(
    channel,
    `You have been subscribed to @catfacts! ${catFacts.random()}`,
     params
   );
  setInterval(getTime, 60000);

  // console.log(bot.getUsers())
  // bot.postMessageToUser('ntamura', randomFact, params);
  // bot.postMessageToChannel('general', randomFact, params);
  // bot.postMessageToGroup('testing', randomFact, params);
})


bot.on('message', (data) => {

  if (data.type === 'message' && data.text.includes('<@UB25RGRGS>')) {
    handleMessage(data.text)
    console.log(data);
  }
  // if (data.type === "desktop_notification") {
  //   let text = data.content
  //   let arg = /([\/])\w+/.exec(text);
  //   if (arg[0]) {
  //     switch(arg[0]) {
  //       case "/facts":
  //         // console.log('/fact!');
  //         bot.postMessageToGroup('testing', randomFact, params);
  //         break;
  //       default:
  //         console.log('default');
  //     }
  //   } else {
  //     console.log('error');
  //   }
  //
  // }
});


bot.on('error', (err) => {
  console.log(err);
})


// references
// https://code.tutsplus.com/articles/building-a-slack-bot-using-nodejs--cms-29444
// https://api.slack.com/events/app_mention
// https://slackapi.github.io/node-slack-sdk/rtm_api
// https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers
// https://blog.heroku.com/how-to-deploy-your-slack-bots-to-heroku
