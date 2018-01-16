
module.exports = function(controller) {
    controller.studio.before('jokes', function(convo, next) {
        var joke = oneLinerJoke.getRandomJoke();
        convo.say(joke.body);
      
        next();
    });

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
