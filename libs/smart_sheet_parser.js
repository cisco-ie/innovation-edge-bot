// Constants, let's move later
const SHEET_ID = process.env.sheet_id;
const SHEET_CACHE_KEY = 'IE_SHEET';
const Cache = require('./store/bot_cache.js');

// Initialize the client
const client = require('smartsheet');
const smartsheet = client.createClient({
  accessToken: process.env.smart_sheet_token,
  logLevel: 'info'
});

// Check if it already exist in cache before processing
Cache.get(SHEET_CACHE_KEY, (err, value) => {
  
});
// The `smartsheet` variable now contains access to all of the APIs
smartsheet.sheets.getSheet({id: SHEET_ID})
    .then(function(sheetInfo) {
      const columnNames = sheetInfo.columns.map(column => column.title);
      // This will create a basic object structure per column names dynamically
      const rowStructure = columnNames.reduce((acc, value) => {
        acc[value] = '';
        return acc;
      }, {});
    
      const rows = sheetInfo.rows.map((row) => {
        const formattedRow = row.cells.reduce((acc, cell, index) => {
            const columnKey = columnNames[index];
            const rowCopy = Object.assign({}, acc, rowStructure);
            console.log(cell);
            rowCopy[columnKey] = cell.value;
          console.log(rowCopy);
            return rowCopy;
        }, {});
        return formattedRow;
      });
      console.log(rows);
    })
    .catch(function(error) {
      console.log(error);
    });