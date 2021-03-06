(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [ {
      id: "invoiceNum",
      alias: "The Invoice Number",
      dataType: tableau.dataTypeEnum.string
  }, {
      id: "total",
      alias: "The Invoice Total",
      dataType: tableau.dataTypeEnum.int
  }];

  var tableSchema = {
      id: "Invoices",
      alias: "List of Invoices",
      columns: cols
  };

  schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {

  $.getJSON("https://39e7da7b4908.ngrok.io/rest/INVOICES", function(resp) {

    
      var result = resp.__ENTITIES,
      
          tableData = [];
          //console.log(result)
      // Iterate over the JSON object
      
      for (var i = 0, len = result.length; i < len; i++) {
      
          tableData.push({
              "invoiceNum": result[i].Invoice_Number,
              "total": result[i].Total
          });
      }

      table.appendRows(tableData);
      doneCallback();
      setTimeout(function(){tableau.dataCallback(result, "", false)}, 3000);
  });
};

  tableau.registerConnector(myConnector);
  $(document).ready(function () {
    setTimeout(function(){tableau.submit()}, 3000);
  });
  $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Invoices";
        tableau.submit();
       
    });
});

})();

