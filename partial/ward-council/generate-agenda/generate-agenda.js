angular.module('church').controller('GenerateAgendaCtrl', function ($scope, $state, wc, $modalInstance) {
    $scope.wc = wc;
    var d = new Date();
    $scope.agenda = {
        date: d.setDate(d.getDate() + ((0 + 7 - d.getDay()) % 7)),
        opening: {},
        keyIndicators: {}
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.create = function () {
        $modalInstance.dismiss();
        $state.go('ward-council-print', {agenda: angular.toJson($scope.agenda)});
    };
});