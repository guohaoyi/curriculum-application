var app = angular.module("courseInfo",[])
app.controller('courseCtrl',function($scope){
    $scope.init = function(stringifiedArray) {
    $scope.skills = JSON.parse(stringifiedArray);
}
});