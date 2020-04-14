myApp.controller("updatebldgCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

  console.log(window.location.href);
  var url = new URL(window.location.href);
  var search = new URLSearchParams(url.search);
  console.log(search.get("building"));
  $scope.buildingName = search.get("building");


  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL ad_view_building_general("' + $scope.buildingName + '")')
  }

  $scope.doQuery = function() {
    conn.getRows(handleData, 'select * from ad_view_building_general_result')
  }

  function handleData(rows) {
    //console.log(rows);
    if(rows != null && rows.length > 0){
      $scope.buildDescr = rows[0].description;
      $scope.$apply($scope.buildDescr);
    }

  }


  $scope.doTagCall = function() {
    conn.getRows($scope.doTagQuery, 'CALL ad_view_building_tags("' + $scope.buildingName + '")')
  }

  $scope.doTagQuery = function() {
    conn.getRows(handleTagData, 'select * from ad_view_building_tags_result')
  }

  function handleTagData(rows) {
    console.log(rows);
    var tagList = [];
    for (var tagInfo of rows) {
      tagList.push(tagInfo.tag);
    }

    $scope.tagData = tagList;
    $scope.$apply($scope.tagData);

  }

  $scope.addTag = function(){
    if($scope.tagData.indexOf($scope.newTag) < 0){
      $scope.tagData.push($scope.newTag);
      //* TO DO
      var query = 'call ad_add_building_tag("'+$scope.buildingName+'", "'+$scope.newTag+'")';
      console.log(query);
      conn.getRows(null, query);
      $scope.newTag = "";
      $scope.dupTagMsgFlag = false;
    }
    else{
      $scope.dupTagMsgFlag = true;
    }
    console.log($scope.tagData);

  }

  $scope.removeTag = function(tagVal){
    var tagIndex = $scope.tagData.indexOf(tagVal);
    $scope.tagData.splice(tagIndex,1);
    console.log($scope.tagData);
    var query = 'call ad_remove_building_tag("'+$scope.buildingName+'", "'+tagVal+'")';
    console.log(query);
    conn.getRows(null, query);
  }


  $scope.goScreen4 = function(){
    console.log('why');
    window.location.href = 'ManageBldgStation.html';
  }

  $scope.doQuery();
  $scope.doCall();
  $scope.doTagCall();

});
