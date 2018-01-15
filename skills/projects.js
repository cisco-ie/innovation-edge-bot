/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

const Cache = require('../store/bot_cache.js');
const CONSTANTS = require('../constants/index.js');

module.exports = function(controller) {

    controller.hears(['projects'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
            convo.ask('What projects would you like to see? \n1. All \n2. Completed \n3. Active \n4. Potential', function(response, convo) {
                const projectMap = {
                  1: CONSTANTS.ALL,
                  2: CONSTANTS.COMPLETED,
                  3: CONSTANTS.ACTIVE,
                  4: CONSTANTS.POTENTIAL
                };
              
                const formatMessage = `Cool! Here are some projects:`;
                const category = parseInt(response.text);
                if (category < 5 && category > 0) {
                  Cache.get(projectMap[category], (err, value) => {
                    if (err) {
                      convo.say('Houston, we got a problem. Please reach out to @brhim about this issue!');
                    } else {
                      if (category === 1) {
                        convo.say(listAllProjects(value));
                      } else {
                        convo.say(listProjects(value));
                      }
                    };
                  });
                } else {
                  convo.say('Hrmm... I\'m not too sure what you are looking for, respond with either **(1/2/3/4)**');
                }
                convo.next();
            });
        });
    });
};

// All projects has a special format
const listAllProjects = (projects) => {
   const message = projects.map(project => `\n #### ${project['Project Name']} \n *${project.Description}* \n\n`);
  return message.toString();
}

// All projects has a special format
const listProjects = (projects) => {
   const message = projects.map(project => `\n #### ${project['Project Name']} \n *${project.Description}*`);
  return message.toString();
}