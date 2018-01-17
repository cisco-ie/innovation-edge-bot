const wordfilter = require('wordfilter');
var PokeApi = require('pokeapi');
var api = PokeApi.v1();

module.exports = (bot, message, entities) => {
  api.get('pokemon', 1).then(function(bulbasaur) {
    console.log("Here's Bulbasaur:", bulbasaur);
	api.get(bulbasaur.moves).then(function(moves) {
	    console.log("Full move list:" + moves);
    })
}, function(err) {
    console.log('ERROR', err);
});
  
  const repeatPhrase = entities.message_body[0].value;
  if (!wordfilter.blacklisted(repeatPhrase)) {
      bot.reply(message, repeatPhrase);
  } else {
      bot.reply(message, '_sigh_');
  }
}