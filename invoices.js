(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [ {
      id: "id",
      alias: "The Invoice Number",
      dataType: tableau.dataTypeEnum.string
  }, {
      id: "mag",
      alias: "The Invoice Total",
      dataType: tableau.dataTypeEnum.float
  }];

  var tableSchema = {
      id: "Invoices",
      alias: "List of Invoices",
      columns: cols
  };

  schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
  $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
    
      var resu = resp.features,
      
          tableData = [];
          //console.log(result)
      // Iterate over the JSON object
      
      for (var i = 0, len = resu.length; i < len; i++) {
      
          tableData.push({
              "invoiceNum": resu[i].id,
              "total": resu[i].properties.mag
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