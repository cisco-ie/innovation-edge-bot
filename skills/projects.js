const Cache = require('../store/bot_cache.js');
const CONSTANTS = require('../constants/index.js');
const smartSheetParser = require('../libs/smart_sheet_parser.js');

const retry = require('retry');
const sm = require('spark-messages');

module.exports = function(controller) {

    controller.hears(['projects'], 'direct_message,direct_mention', function(bot, message) {
        // Fetch projects now for a better experience and less delay
        
      
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
                  },
                  5: {
                    key: CONSTANTS.INACTIVE,
                    name: 'inactive'
                  }
                };
        
              
                const formatMessage = `Cool! Here are some projects:`;
                const category = parseInt(response.text);
                if (category < 5 && category > 0) {
                  convo.say(`Currently there are **${value.length}** ${projectMap[category].name} projects. Here are the projects: \n`);
                  convo.say(listProjects(value));
                } else {
                  convo.say('Hrmm... I\'m not too sure what you are looking for, respond with either **(1 / 2 / 3 /4)**');
                }
                convo.next();
            });
        });
    });
};

const fetchProjects = (cb) => {
  const operation = retry.operation();  
}

function faultTolerantResolve(address, cb) {
  let operation = retry.operation();

  operation.attempt(function(currentAttempt) {
    
    try {
      let value = myCache.get(projectMap[category].key, true);
      if (!value) {
        smartSheetParser.fetchAndUpdate();
        fetchProjects();
      }
    
      return value;
    } catch(err) {
  }
    dns.resolve(address, function(err, addresses) {

      cb(err ? operation.mainError() : null, addresses);
    });
  });
}

faultTolerantResolve(function(err, addresses) {
  console.log(err, addresses);
});
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