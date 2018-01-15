// Constants, let's move later
const SHEET_ID = process.env.sheet_id;
const SHEET_CACHE_KEY = 'IE_SHEET';
const Cache = require('../store/bot_cache.js');

let active_projects = [];
let complete_projects = [];
let potential_projects = [];

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
    
      // Store in cache
      Cache.set(SHEET_CACHE_KEY, rows);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const organizeProjects = (projects) => {
  if (!projects) return;
  projects.forEach(project => {
    if (project.Status === 'Active') { active_projects.push(project) }
    if (project.Status === 'Completed') { completed_projects.push(project) }
    if (project.Status === 'Potential') { potential_projects.push(project) }
  });
  Cache.set(ACTIVE_PROJECT_KEY, active_projects);
  Cache.set(COMPLETED_KEY, completedpro
};

// Check if it already exist in cache before processing
Cache.get(SHEET_CACHE_KEY, (err, value) => {
  if (err) throw new Error('Failed to retrieve cache!');
  
  if (!value) {
    processSheet();
  }
  
  console.log('da value', value);
});
