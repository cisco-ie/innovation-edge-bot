// Initialize the client
const client = require('smartsheet');
const SHEET_ID = process.env.
const smartsheet = client.createClient({
  accessToken: process.env.SECRET.smart_sheet_token
  logLevel: 'info'
});

// The `smartsheet` variable now contains access to all of the APIs

// List all sheets
smartsheet.sheets.listSheets()
  .then(function (result) {
    var sheetId = result.data[0].id;                // Choose the first sheet

    // Load one sheet
    smartsheet.sheets.getSheet({id: sheetId})
      .then(function(sheetInfo) {
        console.log(sheetInfo);
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
    console.log(error);
  });