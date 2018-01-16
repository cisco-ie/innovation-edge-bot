// Constants, let's move later
const SHEET_ID = process.env.sheet_id;
const CONSTANTS = require('../constants/index.js');
const ALL_KEY = CONSTANTS.ALL;
const ACTIVE_KEY = CONSTANTS.ACTIVE;
const COMPLETED_KEY = CONSTANTS.COMPLETED;
const POTENTIAL_KEY = CONSTANTS.POTENTIAL;
const INACTIVE_KEY = CONSTANTS.INACTIVE;

const Cache = require('../store/bot_cache.js');
const promiseRetry = require('promise-retry');

let active_projects = [];
let complete_projects = [];
let potential_projects = [];
let inactive_projects = [];

// Initialize the client
const client = require('smartsheet');
const smartsheet = client.createClient({
  accessToken: process.env.smart_sheet_token,
  logLevel: 'info'
});

// Retrieves sheet and stores in bot cache
const processSheet = () => {
  // The `smartsheet` variable now contains access to all of the APIs
  smartsheet.sheets.getSheet({id: SHEET_ID})
    .then(function(sheetInfo) {
      // Creates a basic hashmap
      // { id: columnName }
      const columnMap = sheetInfo.columns.reduce((acc, column) => {
        return Object.assign({}, acc, {
          [column.id]: column.title
        });
      }, {});
    
      // This will create a row that is formatted into a usable object
      const rows = sheetInfo.rows.map((row) => {
        const formattedRow = row.cells.reduce((acc, cell, index) => {
          const key = columnMap[cell.columnId];
          return Object.assign({}, acc, {
            [key]: cell.value || 'N/A'
          });
        }, {});
        return formattedRow;
      });

      // Organize and cache
      organizeProjects(rows);
      // Store in cache
      Cache.set(ALL_KEY, rows);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const organizeProjects = (projects) => {
  if (!projects) return;
  projects.forEach(project => {
    if (project.Status === 'Active') { active_projects.push(project) }
    if (project.Status === 'Complete') { complete_projects.push(project) }
    if (project.Status === 'Potential') { potential_projects.push(project) }
    if (project.Status === 'Inactive') { inactive_projects.push(project) }
  });
  Cache.set(ACTIVE_KEY, active_projects);
  Cache.set(COMPLETED_KEY, complete_projects);
  Cache.set(POTENTIAL_KEY, potential_projects);
  Cache.set(INACTIVE_KEY, inactive_projects);
};

const fetchSheets = () => {
  let value = Cache.get(ALL_KEY);
  if (!value) {
    processSheet();
    // Reject, but re-process
    return Promise.reject('No value present');
  }
  return Promise.resolve(value);
};

module.exports.update = () => {
  // Re-attempt if fails
  promiseRetry(function (retry, number) {
    return fetchSheets().catch(retry);
  })
  .then(function (value) {
      console.log('Smartsheet successfully processed, and cached');
  }, function (err) {
      console.log('ERROR: Error fetching API', err);
  });
}
