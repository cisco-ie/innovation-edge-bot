const Cache = require('../store/bot_cache.js');
const { TRIGGERS, CONVO } = require('../constants/index.js');

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
