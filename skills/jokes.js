var oneLinerJoke = require('one-liner-joke');

module.exports = function(controller) {
    controller.studio.before('jokes', function(convo, next) {
        var joke = oneLinerJoke.getRandomJoke();
      console.log(joke)
        convo.setVar('joke', joke.body);
      
        next();
    });

    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudioafter
    controller.studio.after('jokes', function(convo, next) {

        console.log('AFTER: jokes');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
