const wordfilter = require('wordfilter');
const request = require('request');
const pokeNumber = 800;

module.exports = (bot, message, entities) => {
  bot.reply(message, 'Sure! Looking in my Pokédex right now... 🤓');
  var randomNumber = Math.floor(Math.random() * pokeNumber);
  request('http://pokeapi.co/api/v2/pokemon/' + randomNumber, function (error, response, body) {
    if (error) {
      bot.say('Maayday, we got a problem. Try again later.');
    }
    const pokemon = JSON.parse(body);
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const messageObject = {
      text: `### #${randomNumer} ${name} \n ${name} has **${pokemon.moves.length}** moves, and weighs ${pokemon.weight} lbs!`,
      files:[
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`
      ]
    };
    bot.reply(message, messageObject);
  });
};
