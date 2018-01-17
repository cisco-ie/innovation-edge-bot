const DAY_IN_SECONDS = 86400;
const { TRIGGERS, CONVO } = require('../constants/index.js');

// Serve as a caching store
const NodeCache = require( "node-cache" );
const botCache = new NodeCache();

botCache.set(TRIGGERS, 0);
botCache.set(CONVO, 0);

module.exports = botCache;