const { TRIGGER, CONVO } = require('../constants/index.js');
const Cache = require('../store/bot_cache.js');

const formatUptime = uptime => {
    var unit = 'second';

    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = parseInt(uptime) + ' ' + unit;
    return uptime;
};

module.exports = function(bot, message) {
//       /* Collect some very simple runtime stats for use in the uptime/debug command */
//     var stats = {
//         triggers: 0,
//         convos: 0,
//     }

//     controller.on('heard_trigger', function() {
//         stats.triggers++;
//     });

//     controller.on('conversationStarted', function() {
//         stats.convos++;
//     });
  
   bot.createConversation(message, function(err, convo) {
      if (!err) {           
          const triggers = Cache.get(TRIGGERS);
          const convos = Cache.get(CONVOS);
          convo.setVar('uptime', formatUptime(process.uptime()));
          convo.setVar('convos', convos);
          convo.setVar('triggers', triggers);
          convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
          convo.activate();
      }
  });
};t