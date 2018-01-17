/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/
const Cache = require('../store/bot_cache.js');
const { TRIGGERS, CONVO } = require('../constants/index.js');

var wordfilter = require('wordfilter');

module.exports = function(controller) {
      /* Collect some very simple runtime stats for use in the uptime/debug command */
    var stats = {
        triggers: 0,
        convos: 0,
    }

    controller.on('heard_trigger', function() {
        stats.triggers++;
        Cache.set(TRIGGERS, stats.triggers);
    });

    controller.on('conversationStarted', function() {
        stats.convos++;
        Cache.set(CONVO, stats.convos);
    });
};
