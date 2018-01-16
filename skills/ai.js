const {Wit, log} = require('node-wit');
const WIT_TOKEN = process.env.wit_token;
const client = new Wit({
  accessToken: WIT_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

module.exports = function(controller) {
    // This before middleware allows the help command to accept sub-thread names as a parameter
    // so users can say help to get the default thread, but help <subthread> will automatically
    // jump to that subthread (if it exists)
    controller.hears('.*' , 'direct_message,direct_mention', (bot, message) => {
      console.log(message)
      client.message(message.text).then(resp => console.log(resp.entities));

      
    });
}
