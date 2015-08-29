angular.module('church').controller('WardCouncilCtrl', function ($scope, $state, wc, trello, $modal) {
    $scope.$state = $state;
    $scope.wc = wc;
    $scope.agendas = [];
    trello.getCardActions(trello.DATA_CARD).then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var action = data[i];
            switch (action.type) {
                case 'commentCard':
                    var agenda = angular.fromJson(action.data.text);
                    $scope.agendas.push(agenda);
                    break;
            }
        }
    });
    
    $scope.create = function(){
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'partial/ward-council/generate-agenda/generate-agenda.html',
            controller: 'GenerateAgendaCtrl',
            size: 'sm'
        });
    };

    $scope.open = function (agenda) {
        $state.go('ward-council-print', {agenda: angular.toJson(agenda)});
    };
});