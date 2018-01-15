/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

const CACHE = require('../store/bot_cache.js');
const CONSTANTS = require('../constants/keys.js);

module.exports = function(controller) {

    controller.hears(['projects'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
            convo.ask('What projects would you like to see? \n1. All \n2. Completed \n3. Active \n4. Potential', function(response, convo) {
                const projectMap = {
                  1: CONSTANTS.,
                  2: CONSTANTS.
                convo.say('Cool! Here are some of the projects for' + response.text + ' too!');
                convo.next();
            });
        });

    });
};