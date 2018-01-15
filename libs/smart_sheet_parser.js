// Constants, let's move later
const SHEET_ID = process.env.sheet_id;

// Initialize the client
const client = require('smartsheet');
const smartsheet = client.createClient({
  accessToken: process.env.smart_sheet_token,
  logLevel: 'info'
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
  
      con
  
      console.log(row);
    })
    .catch(function(error) {
      console.log(error);
    });