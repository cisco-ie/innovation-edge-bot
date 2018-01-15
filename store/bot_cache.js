const DAY_IN_SECONDS = 86400;

// Serve as a caching store
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

module.exports = myCache;