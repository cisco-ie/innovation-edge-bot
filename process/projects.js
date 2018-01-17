const Cache = require('../store/bot_cache.js');
const CONSTANTS = require('../constants/index.js');
const smartSheetParser = require('../libs/smart_sheet_parser.js');
const sm = require('spark-messages');

module.exports = function(bot, message) {
    // Fetch projects now for a better experience and less delay
    smartSheetParser.update();

    bot.startConversation(message, (err, convo) => {
      convo.addMessage('🔥 Houston, we got a problem! Please try again in a **few** minutes. If the issue continues to persist reach out to my creator, Brandon Him (brhim@cisco.com).', 'error');

      convo.addQuestion('What projects would you like to see? \n1. All \n2. Completed \n3. Active \n4. Potential \n5. Inactive \n\n *(Hint: Enter either 1 / 2 / 3 / 4 / 5)*'
        , (response, convo) => {
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
            if (category < 6 && category > 0) {
              try {
                let projects = Cache.get(projectMap[category].key);
                if (!projects) {
                    convo.gotoThread('error');
                }

                convo.addMessage(`Currently there are **${projects.length}** ${projectMap[category].name} projects. Here are the projects: \n`, 'default');
                convo.addMessage(listProjects(projects));

              } catch (err) {
                convo.gotoThread('error');
              }
            } else {
              convo.addMessage('Hrrmmm... unsure of what you wanted, feel free to ask me again another time.', 'default');
              convo.next();
            }
            convo.next();
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