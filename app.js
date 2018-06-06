require('dotenv').config()
// available functions
// catFacts.random();
// catFacts.all;

const Bot = require('slackbots')
const catFacts = require('cat-facts');
const openers = require('./openers.js');

const settings = {
  token: process.env.TOKEN,
  name: 'Catfacts'
}

const params = {
  icon_emoji: ':cf:',
  link_names: true
};
const bot = new Bot(settings)
const channel = 'testing'

let randOpen = () => (openers[Math.floor(Math.random()*openers.length)])

const getTime = () => {
  // consider external lib instead.
  let time = new Date().toLocaleTimeString()
  let day = new Date().getDay()
  if ((time.includes('13:00')) && (day === 6)) {
    bot.postMessageToGroup(
      channel,
      `Happy Caturday! ${catFacts.random()}`,
      params
    )
  }
}

const handleMessage = (data) => {
  // console.log(data);
  // console.log(data.getUser() );
  // let userID = data.user

  // const postMessageToUserById = async (userID, 'message', params) => {
  //   const { channel: { id: channelID } } = await bot.openIm(userID);
  //   bot.postMessage(channelID, 'message', opts)
  // }

  // bot.openIm(data.user)
  // .then(() => {
  //   bot.postMessage(data.user, 'hi')
  // })
  // console.log(bot.getUsers());

  let msg = data.text

  if (msg.split(' ').length === 1) {
    bot.postMessageToGroup(channel, 'Meow?', params);
  } else if (msg.includes(' fact')) {
    bot.postMessageToGroup(channel, randOpen() + catFacts.random(), params);
  } else if (msg.includes(' dm')) {
    bot.postMessageToGroup(channel, 'DM unavailable at this moment.', params);
    // bot.postMessageToUser(data.user, catFacts.random(), params);
    // bot.postMessageToUser(data.user, 'hi')
    //   .always((data) => {
    //     // console.log(data);
    // })
  } else if (msg.includes(' help')) {
    bot.postMessageToGroup(channel, 'You can @catfacts + "fact" to hear a random fact. Bot will also run every Sunday at 1PM.', params);
  } else {
    bot.postMessageToGroup(channel, 'No idea what you mean right meow. try typing "fact"', params);
  }
}

bot.on('start', () => {
  console.log('Catfacts server running');
  setInterval(getTime, 60000);
  // bot.postMessageToGroup(
  //   channel,
  //   `You have been subscribed to @catfacts! ${catFacts.random()}`,
  //    params
  //  );
  // console.log(bot.getUsers())
  // bot.postMessageToUser('ntamura', randomFact, params);
  // bot.postMessageToChannel('general', randomFact, params);
  // bot.postMessageToGroup('testing', randomFact, params);
})

bot.on('message', (data) => {
  if (data.type === 'message' && data.text.includes('<@UB25RGRGS>')) {
    handleMessage(data)
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
  //   } else { console.log('error') }
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
