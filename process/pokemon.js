const wordfilter = require('wordfilter');
const request = require('request');
const pokeNumber = 800;

module.exports = (bot, message, entities) => {
  const randomIntros = [
    'Sure! Looking in my Pokédex right now... 🤓',
    'Lucky for you, I\'m a Pokémon Master! Let me check my Pokédex...',
    `I've caught ${pokeNumber} Pokémon thus far, let me show you one of my favorites..`,
    'Prepared to see one of the coolest of em all',
    'I love Pokémon! Let me tell you one of my favorites, hold on..',
    'Pokémon is my middle name! Here\'s a cool one...'
  ];
  const intro = randomIntros[Math.floor(Math.random() * randomIntros.length)];
  bot.reply(message, intro);
  var randomNumber = Math.floor(Math.random() * pokeNumber);
  request('http://pokeapi.co/api/v2/pokemon/' + randomNumber, function (error, response, body) {
    if (error) {
      bot.say('Maayday, we got a problem. Try again later.');
    }
    const pokemon = JSON.parse(body);
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const messageObject = {
      text: `### #${randomNumber} ${name} \n ${name} has **${pokemon.moves.length}** moves, and weighs ${pokemon.weight} lbs!`,
      files:[
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`
      ]
    };
    bot.reply(message, messageObject);
  });
};
