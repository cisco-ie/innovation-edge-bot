const Cache = require('../store/bot_cache.js');
const CONSTANTS = require('../constants/index.js');

const sm = require('spark-messages');

module.exports = function(controller) {

    controller.hears(['projects'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
            convo.ask('What projects would you like to see? \n1. All \n2. Completed \n3. Active \n4. Potential', function(response, convo) {
                const projectMap = {
                  1: {
                    key: CONSTANTS.ALL,
                    name: ''
                  },
                  2: {
                    key: CONSTANTS.COMPLETED,
                    name: 'completed'
                  },
                  3: {
                    key: CONSTANTS.ACTIVE,
                    name: 'active'
                  },
                  4: {
                    key: CONSTANTS.POTENTIAL,
                    name: 'potential'
                  }
                };
        
              
                const formatMessage = `Cool! Here are some projects:`;
                const category = projectMapparseInt(response.text)
                if (category < 5 && category > 0) {
                  Cache.get(projectMap[category].key, (err, value) => {
                    if (err) {
                      convo.say('Houston, we got a problem. Please reach out to @brhim about this issue!');
                    } else {
                        convo.say(`Currently there are **${value.length}** ${} projects. Here are the projects: \n`);
                        convo.say(listProjects(value));
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
const listProjects = (projects) => {
   const message = projects.map(project => {
     const containsDemo = (project.Demo !== '#') && (project.Demo !== 'N/A');
     const demoString = (containsDemo) ? `| ${sm.link(project.Demo, '**View Demo**')}` : '';
     
     return `
${sm.h3(project['Project Name'])}
>${project.Description}

${sm.b(project.Status)}  |  ${sm.i(project['Tech Lead'])} ${demoString}

${sm.hr()}`
   });
  return message.join("").toString();
}