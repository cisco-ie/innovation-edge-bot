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
       console.log(sheetInfo.rows[1].cells);
      const columnNames = sheetInfo.columns.map(column => column.title);
      // This will create a basic object structure per column names dynamically
      const rowStructure = columnNames.reduce((acc, value) => {
        acc[value] = '';
        return acc;
      }, {});
  
      console.log(rowStructure);
  
      const rows = sheetInfo.rows.map((row) => {
        const formattedRows = row.cells.map((cell, index) => {
            const columnKey = columnNames[index];
            const rowCopy = Object.assign({}, rowStructure);
            rowCopy[columnKey] =
            return rowCopy;
        });
      });
  
      console.log(rows);
    })
    .catch(function(error) {
      console.log(error);
    });