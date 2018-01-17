/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/
const Cache = require('../store/bot_cache.js');
const { TRIGGER, CONVO } = require('../constants/index.js');

var wordfilter = require('wordfilter');

module.exports = function(controller) {
      /* Collect some very simple runtime stats for use in the uptime/debug command */
    var stats = {
        triggers: 0,
        convos: 0,
    }

    controller.on('heard_trigger', function() {
        stats.triggers++;
        Cache.set(TRIGGER, stats.triggers);
    });

    controller.on('conversationStarted', function() {
        stats.convos++;
        Cache.set(CONVO, stats.convos);
    });


  
    controller.hears(['^uptime','^debug'], 'direct_message,direct_mention', function(bot, message) {

 
    });

    controller.hears(['^say (.*)','^say'], 'direct_message,direct_mention', function(bot, message) {
        if (message.match[1]) {

            if (!wordfilter.blacklisted(message.match[1])) {
                bot.reply(message, message.match[1]);
            } else {
                bot.reply(message, '_sigh_');
            }
        } else {
            bot.reply(message, 'I will repeat whatever you say.')
        }
    });
};
