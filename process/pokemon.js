const wordfilter = require('wordfilter');
var PokeApi = require('pokeapi');
const pokeNumber = 800;
var api = PokeApi.v1();

module.exports = (bot, message, entities) => {
  var randomNumber = Math.floor(Math.random() * pokeNumber);
  api.get('pokemon', randomNumber).then(function(pokemon) {
    console.log(pokemon);
    const messageObject = {
      // text: `Have you heard of, ${pokemon.name}! ${pokemon.name} has **${pokemon.moves.length}** moves, and weighs ${pokemon.weight} lbs!`,
      files:[
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`
      ]
    };
    
    bot.say(message, messageObject);
  }, function(err) {
      console.log('ERROR', err);
  });
}