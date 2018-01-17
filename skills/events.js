module.exports = function(controller) {

  controller.on('bot_space_join', function(bot, message) {
    bot.reply(message, 'Beep! Boop! I am a bot serving as Captain and Commander of the Innovation Edge\'s Bot Division. Let me know if I can be of your assistance.');
  });

  controller.on('user_space_join', function(bot, message) {
    bot.reply(message, 'Hello, ' + message.raw_message.data.personDisplayName);
  });
};