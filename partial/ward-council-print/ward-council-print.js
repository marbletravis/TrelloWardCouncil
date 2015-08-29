angular.module('church').controller('WardCouncilPrintCtrl', function ($scope, trello, $state,wc) {
    $scope.wc = wc;
    $scope.agenda = angular.fromJson($state.params.agenda);
    
    $scope.canSave = true;
    $scope.saved = false;
    $scope.save = function(){
        $scope.canSave = false;
        trello.addComment(trello.DATA_CARD, angular.toJson($scope.agenda)).then(function(){
            $scope.saved = true;
        }, function(){
            $scope.canSave = true;
        });
    };

    $scope.AGENDA_ID = '55b3ab92768e1cd9468ea625';
    $scope.NEW_MEMBERS_ID = '55b3ab88130bb7bf0e6bd260';
    $scope.MEMBER_FOCUS_ID = '55b3ab8b97959c67c22e9c95';
    $scope.cards = {};
    
    trello.getBoard(trello.WARD_COUNCIL).then(function (data) {
        $scope.board = data;
        var promises = [];
        for (var i = 0; i < data.cards.length; i++) {
            var promise = processCard(data.cards[i], data);
            promises.push(promise);
        }
    });

    function processCard(card, board) {
        if (!angular.isDefined($scope.cards[card.idList])) {
            $scope.cards[card.idList] = [];
        }
        $scope.cards[card.idList].push(card);
        switch (card.idList) {
            case $scope.NEW_MEMBERS_ID:
                processNewMember(card, board);
                break;
        }
        
        return trello.getCardActions(card.id).then(function (data) {
            card.actions = data;
            card.comments = [];
            for (var i = 0; i < card.actions.length; i++) {
                var action = card.actions[i];
                switch (action.type) {
                    case 'commentCard':
                        card.comments.push(action.data);
                        break;
                }
            }
        });
        
    }

    var ADDRESS_KEY = '**Address: **';
    var DATE_KEY = '**Date: **';
    function processNewMember(card, board) {
        var desc = card.desc;
        var addressIdx = desc.indexOf(ADDRESS_KEY);
        var dateIdx = desc.indexOf(DATE_KEY);
        card.address = desc.substr(ADDRESS_KEY.length + addressIdx, dateIdx - (ADDRESS_KEY.length + addressIdx)).trim();
        card.date = desc.substr(dateIdx + DATE_KEY.length, desc.length - (dateIdx + DATE_KEY.length)).trim();

        for (var i = 0; i < card.checklists.length; i++) {
            processChecklist(card.checklists[i], card, board);
        }
    }

    var MEMBER_NEEDS = 'New Member Needs';
    $scope.BV = 'Bishopric Visit';
    $scope.HPV = 'High Priests Visit';
    $scope.EV = 'Elders Visit';
    $scope.RSV = 'RS Visit';
    $scope.C = 'Calling';
    $scope.HT = 'Home Teachers';
    $scope.VT = 'Visiting Teachers';
    $scope.YMV = 'YM Visit';
    $scope.YWV = 'YW Visit';
    $scope.PV = 'Primary Visit';
    var checkItemIds = {};
    function processChecklist(checklist, card, board) {
        switch (checklist.name) {
            case MEMBER_NEEDS:
                card.needs = {};
                for (var i = 0; i < checklist.checkItems.length; i++) {
                    var item = checklist.checkItems[i];
                    checkItemIds[item.id] = item.name;
                    card.needs[item.name] = false;
                }
                for (i = 0; i < card.checkItemStates.length; i++) {
                    var state = card.checkItemStates[i];
                    card.needs[checkItemIds[state.idCheckItem]] = state.state === 'complete';
                }
                break;
        }
    }
});