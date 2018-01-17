const wordfilter = require('wordfilter');
var PokeApi = require('pokeapi');
const pokeNumber = 386;
var api = PokeApi.v1();

module.exports = (bot, message, entities) => {
  var randomNumber = Math.floor(Math.random() * 386);

  api.get('pokemon', randomNumber).then(function(pokemon) {    
    bot.say(message, {text:'', files:['http://myserver.com/file.pdf']});
  }, function(err) {
      console.log('ERROR', err);
  });
}