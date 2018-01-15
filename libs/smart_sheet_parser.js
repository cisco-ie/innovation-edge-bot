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
      console.log(sheetInfo);
    })
    .catch(function(error) {
      console.log(error);
    });