function sendUserError(message) {
  var cc = DataStudioApp.createCommunityConnector();
  cc.newUserError()
    .setText(message)
    .throwException();
}

// This funtion returns an array of the different sheet names of the sheets that are under a given Google Sheet ID that is passed as the "sheetId" parameter
function optionsForSheetName(sheetId) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheets = ss.getSheets();
  var sheetNames = [];
  sheets.forEach(function (sheet) {
    sheetNames.push(sheet.getName());
  });
  // console.log(sheetNames);

  return sheetNames;
}

// This function returns an array of all the Google Sheets in the Google Drive of the user who is creating the data source.
function optionsForSpreadsheetName() {
  var docs = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
  var spreadsheetNames = [];
  var spreadsheetNameTemp = [];  
  while (docs.hasNext()) {
    var doc = docs.next();
    spreadsheetNameTemp.push(doc.getName());
    spreadsheetNameTemp.push(doc.getId());
    spreadsheetNames.push(spreadsheetNameTemp);
    spreadsheetNameTemp = [];
  }
  return spreadsheetNames;
}

// This is the getConfig() function that is called by Looker Studio when configuring a data connection/source
function getConfig(request) {
  var communityConnector = DataStudioApp.createCommunityConnector();
  var connectorConfig = communityConnector.getConfig();

  connectorConfig.setDateRangeRequired(true);

  var configParams = request.configParams;
  var isFirstRequest = configParams === undefined;
  
  if (isFirstRequest) {
    connectorConfig.setIsSteppedConfig(true);
  }

  connectorConfig
    .newSelectSingle()
    .setId('spreadsheetChoice')
    .setName('Choice of Spreadsheet Selector')
    .setIsDynamic(true)
    .setAllowOverride(false)
    .addOption(
      connectorConfig
      .newOptionBuilder()
      .setLabel('Enter Sheet ID to a textbox.')
      .setValue('true')
    )
    .addOption(
      connectorConfig
      .newOptionBuilder()
      .setLabel('Select Sheet by name from a dropdown.')
      .setValue('false')
    );


  if (!isFirstRequest) {

    var isSecondRequest = configParams.sheetId === undefined;

    if(isSecondRequest){

      if(configParams.spreadsheetChoice === 'true' ){
        var spreadsheetName = connectorConfig
          .newTextInput()
          .setId('sheetId')
          .setName('Google Sheet ID')
          .setHelpText('Enter the Sheet ID of your Google Sheet')
          .setIsDynamic(true)
          .setAllowOverride(true);
      }else{
        var spreadsheetName = connectorConfig
          .newSelectSingle()
          .setId('sheetId')
          .setName('Google Sheet ID')
          .setIsDynamic(true)
          .setAllowOverride(true);
        var spreadsheetNameOptions = optionsForSpreadsheetName();
        spreadsheetNameOptions.forEach(function(labelAndValue) {
          // console.log("Label: "+labelAndValue[0]);
          // console.log("Value: "+labelAndValue[1]);
          var spreadsheetNameLabel = labelAndValue[0];
          var spreadsheetNameValue = labelAndValue[1];
          spreadsheetName.addOption(connectorConfig.newOptionBuilder().setLabel(spreadsheetNameLabel).setValue(spreadsheetNameValue));
        });
      }

      connectorConfig.setIsSteppedConfig(true);

    }//End of isSecondRequest IF

    if(!isSecondRequest ){

      if(configParams.spreadsheetChoice === 'true' ){
        var spreadsheetName = connectorConfig
          .newTextInput()
          .setId('sheetId')
          .setName('Google Sheet ID')
          .setHelpText('Enter the Sheet ID of your Google Sheet')
          // .setIsDynamic(true)
          .setAllowOverride(true);
      }else{
        var spreadsheetName = connectorConfig
          .newSelectSingle()
          .setId('sheetId')
          .setName('Google Sheet ID')
          // .setIsDynamic(true)
          .setAllowOverride(true);
        var spreadsheetNameOptions = optionsForSpreadsheetName();
        spreadsheetNameOptions.forEach(function(labelAndValue) {
          // console.log("Label: "+labelAndValue[0]);
          // console.log("Value: "+labelAndValue[1]);
          var spreadsheetNameLabel = labelAndValue[0];
          var spreadsheetNameValue = labelAndValue[1];
          spreadsheetName.addOption(connectorConfig.newOptionBuilder().setLabel(spreadsheetNameLabel).setValue(spreadsheetNameValue));
        });
      }

      var sheetName = connectorConfig
        .newSelectSingle()
        .setId("sheetName")
        .setName("Sheet Name")
        .setHelpText('Enter the Sheet Name of the Google Sheet you want to read')
        .setAllowOverride(true);
      var sheetNameOptions = optionsForSheetName(configParams.sheetId);
      sheetNameOptions.forEach(function(labelAndValue) {
        var sheetNameLabel = labelAndValue;
        var sheetNameValue = labelAndValue;
        sheetName.addOption(connectorConfig.newOptionBuilder().setLabel(sheetNameLabel).setValue(sheetNameValue));
      });

      connectorConfig
        .newTextInput()
        .setId('sheetRange')
        .setName('Sheet Range')
        .setHelpText('Enter the Range of your sheet which you want to read')
        .setAllowOverride(true);

      connectorConfig
        .newTextInput()
        .setId('sheetParamsCell')
        .setName('Sheet Parameter(s) Location')
        .setHelpText('Enter the Sheet Name & Cell (comma separated) where the parameters need to be written to. (eg: config,B1)')
        .setAllowOverride(true);
  
      connectorConfig
        .newTextInput()
        .setId('sheetParam1')
        .setName('Parameter 1')
        .setAllowOverride(true);

      connectorConfig
        .newTextInput()
        .setId('sheetParam2')
        .setName('Parameter 2')
        .setAllowOverride(true);

      connectorConfig
        .newTextInput()
        .setId('sheetParam3')
        .setName('Parameter 3')
        .setAllowOverride(true);

      connectorConfig
        .newTextInput()
        .setId('sheetParam4')
        .setName('Parameter 4')
        .setAllowOverride(true);

      connectorConfig
        .newTextInput()
        .setId('sheetParam5')
        .setName('Parameter 5')
        .setAllowOverride(true);

      connectorConfig
        .newTextInput()
        .setId('sheetParam6')
        .setName('Parameter 6')
        .setAllowOverride(true);


    }//End of !isSecondRequest IF

  }

  return connectorConfig.build();
}

function findLineSeparator(content) {
  if (!content) {
    return undefined;
  }
  if (content.indexOf('\r\n') >= 0) {
    // Windows
    return '\r\n';
  } else if (content.indexOf('\r') >= 0) {
    // MacOS
    return '\r';
  } else if (content.indexOf('\n') >= 0) {
    // Linux / OSX
    return '\n';
  } else {
    return undefined;
  }
}

// This function is used to fetch data from a given Google Sheet's specified Sheet Range & then it converts it to CSV format and returns the data.
function fetchData(sheetId, sheetNameRange){
  var sheet = SpreadsheetApp.openById(sheetId);
  var vals = sheet.getRange(sheetNameRange).getValues();

  var csvString = vals.join("\n");

  return csvString;
}

// This function is called to form the schema for the data connection in Looker Studio
function getFields(request, content) {
  var communityConnector = DataStudioApp.createCommunityConnector();
  var fields = communityConnector.getFields();
  var types = communityConnector.FieldType;
  var textQualifier = 'undefined';
  var containsHeader = 'true';

  var lineSeparator = findLineSeparator(content);
  var firstLineContent;
  if (lineSeparator) {
    firstLineContent = content.substring(0, content.indexOf(lineSeparator));
  } else {
    firstLineContent = content;
  }

  var valueSeparator = ',';
  if (textQualifier !== 'undefined') {
    firstLineContent = firstLineContent.substring(
      1,
      firstLineContent.length - 1
    );
    valueSeparator = textQualifier + valueSeparator + textQualifier;
  }
  var firstLineColumns = firstLineContent.split(valueSeparator);

  // console.log(firstLineColumns);

  var i = 1;
  firstLineColumns.forEach(function(value) {
    var field = fields.newDimension().setType(types.TEXT);
    if (containsHeader === 'true') {
      // because Id can't have space
      field.setId(value.replace(/\s/g, '_').toLowerCase());
      field.setName(value);
    } else {
      field.setId('column_' + i);
      i++;
    }
  });

  return fields;
}

// This function is called to get the Schema of the data connection each time it is needed from Looker Studio's end.
function getSchema(request) {
  var sheetName = request.configParams['sheetName'];
  var sheetRange = request.configParams['sheetRange'];
  var sheetNameRange = sheetName + "!" + sheetRange;
  var content = fetchData(request.configParams['sheetId'], sheetNameRange);
  var fields = getFields(request, content).build();
  return {schema: fields};
}

// This function is called by Looker Studio each time it needs to refresh the data in a Looker Studio report. The getData function gets called by each component in a Looker Studio report.
function getData(request) {

  var sheetId = request.configParams['sheetId'];
  var sheetParam1 = request.configParams['sheetParam1'];
  var sheetParam2 = request.configParams['sheetParam2'];
  var sheetParam3 = request.configParams['sheetParam3'];
  var sheetParam4 = request.configParams['sheetParam4'];
  var sheetParam5 = request.configParams['sheetParam5'];
  var sheetParam6 = request.configParams['sheetParam6'];
  var sheetParamsCell = request.configParams['sheetParamsCell'];
  var allSheetParams = sheetParam1 + ';' + sheetParam2 + ';' + sheetParam3 + ';' + sheetParam4 + ';' + sheetParam5 + ';' + sheetParam6;

  var paramSheet = SpreadsheetApp.openById(sheetId);
  var paramSheetInfo = sheetParamsCell.split(",");
  paramSheet.getSheetByName(paramSheetInfo[0]).getRange(paramSheetInfo[1]).setValue(allSheetParams);

  var startDate = new Date(request['dateRange'].startDate);
  var endDate = new Date(request['dateRange'].endDate);

  paramSheet.getSheetByName(paramSheetInfo[0]).getRange('C1').setValue(startDate);
  paramSheet.getSheetByName(paramSheetInfo[0]).getRange('D1').setValue(endDate);

  var sheetName = request.configParams['sheetName'];
  var sheetRange = request.configParams['sheetRange'];
  var sheetNameRange = sheetName + "!" + sheetRange;

  var content = fetchData(sheetId, sheetNameRange);

  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var fields = getFields(request, content);
  var requestedFields = fields.forIds(requestedFieldIds);
  var buildedFields = fields.build();

  var requestedFieldsIndex = buildedFields.reduce(function(
    filtered,
    field,
    index
  ) {
    if (requestedFieldIds.indexOf(field.name) >= 0) {
      filtered.push(index);
    }
    return filtered;
  },
  []);

  var textQualifier = 'undefined';
  var delimiter = ',';
  var containsHeader = 'true';

  var lineSeparator = findLineSeparator(content);
  var contentRows;
  if (lineSeparator) {
    contentRows = content.split(lineSeparator);
  } else {
    contentRows = [content];
  }
  var valueSeparator = delimiter;
  if (textQualifier !== 'undefined') {
    valueSeparator = textQualifier + valueSeparator + textQualifier;
  }

  var rows = contentRows
    .filter(function(contentRow) {
      // Remove rows that are empty.
      return contentRow.trim() !== '';
    })
    .map(function(contentRow, idx) {
      if (textQualifier !== 'undefined') {
        contentRow = contentRow.substring(1, contentRow.length - 1);
      }
      var allValues = contentRow.split(valueSeparator);
      if (buildedFields.length !== allValues.length) {
        sendUserError(
          'Error parsing content. Row: ' +
            idx +
            ' has ' +
            allValues.length +
            ' field(s), but ' +
            buildedFields.length +
            ' field(s) were expected.'
        );
      }
      var requestedValues = allValues.filter(function(value, index) {
        return requestedFieldsIndex.indexOf(index) >= 0;
      });
      return {values: requestedValues};
    });
  if (containsHeader === 'true') {
    rows = rows.slice(1);
  }

  var resultt = {
    // schema: requestedFields.build(),
    schema: getAnOrderFromCsvFile(requestedFieldIds, buildedFields),
    rows: rows
  };

  return resultt;
}

// This function is used to prevent the chances of the field order getting shuffled when it is being returned as part of the schema in the getData response.
function getAnOrderFromCsvFile(fieldsIdsFromRequest, fieldsInOrderFromCsvFile) {
  return fieldsInOrderFromCsvFile.filter(function(fieldFromCsvFile) {
    return fieldsIdsFromRequest.indexOf(fieldFromCsvFile.name) >= 0;
  });
}

// This function is called by Looker Studio to check if the effective user of a session is an admin user so that it's able to show more detailed info in errors. This comes in handy during debugging.
function isAdminUser(){
 var email = Session.getEffectiveUser().getEmail();
 var adminEmail = userProperties.getProperty('admin_email');
  if( email == adminEmail ){
    return true; 
  } else {
    return false;
  }
}