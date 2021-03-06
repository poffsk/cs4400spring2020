const fs = require("fs");
const errormsg = require("../js/controllers/errormsg.js");
myApp.controller("currentinformationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";


  $scope.defineCustomer = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if (obj.length > 0) {
      customerUsername = obj[0].username
      $scope.customerUsername = customerUsername;
    }
  }


  $scope.doCall = function() {
    console.log('CALL cus_current_information_basic("' + $scope.customerUsername + '")');
    conn.getRows($scope.doQuery, 'CALL cus_current_information_basic("' + $scope.customerUsername + '")')
  }

  $scope.doQuery = function() {
    conn.getRows(handleData, 'select * from cus_current_information_basic_result')
  }


  function handleData(rows) {
    console.log(rows);
    $scope.customerInfo = rows[0];
    $scope.$apply();
  }

  $scope.goOrder = function() {
    errormsg.closeErrorMsg();
    console.log($scope.tableResult);
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      window.location.href = 'order.html?foodTruckName=' + currRow.foodTruckName;
      }
      else {errormsg.showErrorMsg("error","Please select a truck");}
  }


  $scope.callTable = function() {
    console.log('CALL cus_current_information_foodTruck("' + $scope.customerUsername + '")')
      conn.getRows($scope.doTableQuery, 'CALL cus_current_information_foodTruck("' + $scope.customerUsername + '")')
  }

  $scope.doTableQuery = function() {
    conn.getRows(handleTableData, 'select * from cus_current_information_foodTruck_result')
  }


  function handleTableData(rows) {
    console.log(rows);
    var tableResult = [];
    for (var tableData of rows) {
      tableResult.push(tableData);
    }
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);

    $scope.tableResult = tableResult;
    $scope.$apply($scope.tableResult);
  }

  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }


  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }

  $scope.defineCustomer()
  $scope.doCall()
  $scope.callTable()

  //callTable

});
