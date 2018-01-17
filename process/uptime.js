const { TRIGGERS, CONVO } = require('../constants/index.js');
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
   bot.createConversation(message, function(err, convo) {
      if (!err) {           
          const triggers = Cache.get(TRIGGERS);
          const convos = Cache.get(CONVO);
          convo.setVar('uptime', formatUptime(process.uptime()));
          convo.setVar('convos', convos);
          convo.setVar('triggers', triggers);
          convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
          convo.activate();
      }
  });
};