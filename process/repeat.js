const wordfilter = require('wordfilter');

module.exports = (bot, message, entities) => {
  const repeatPhrase = entities.message_body[0].value;
  if (!wordfilter.blacklisted(repeatPhrase)) {
      bot.reply(message, repeatPhrase);
  } else {
      bot.reply(message, '_sigh_');
  }
}