function doGet(){
  Logger.log("DoGet Running");
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function addData(sheeturl){
  var sheet = SpreadsheetApp.openByUrl(sheeturl);
  var range = sheet.getDataRange();
  var data = range.getValues();
  var lastRow = range.getLastRow();
  var newdata = [];
  Logger.log(lastRow);
  
  var stopscript = false;
  
  for(i in data){
    if(i < lastRow + 1){
      var row = data[i];
      var price = row[2];
      if(row[0] != "----" && row[1] != "END ARCHIVED DATA"){
        if(price != "" && price != "Ammount"){
          var duplicate = false;
          
          for(x in newdata){
            
            var newrow = newdata[x];
            if(newrow[2] != ""){
              if(newrow[1] == row[1]){
                var duplicate = true;
                Logger.log(newdata[x][2] + " = " + price + " + " + newrow[2]);
                newdata[x][2] = price + newrow[2];
              }
            }
          }
          if(duplicate == false){
            newdata.push(row);
          }
        }
      } else{
        newdata = [];
      }
    }
  }
  
  if(stopscript != false && false){
    sheet.appendRow([" ", " "]);
    sheet.appendRow(["BEGIN SORTED DATA", "--------", "--------"]);
    
    for(q in newdata){
      sheet.appendRow(newdata[q]);
    }
  }
  
  return JSON.stringify(newdata);
  Logger.log(newdata);
}

function sheetClear(sheeturl){
  var sheet = SpreadsheetApp.openByUrl(sheeturl);
  sheet.appendRow([" ", " "]);
  sheet.appendRow(["----", "END ARCHIVED DATA"]);
}
