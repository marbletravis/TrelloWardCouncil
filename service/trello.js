angular.module('church').factory('trello', function ($q) {

    var trello = {};
    trello.WARD_COUNCIL = 'GF7BJSUs';
    trello.DATA_CARD = 'qbjBxPrI';
    trello.SECRET = '5dad044909383f23d7586fe8777d1cb4cacbf523476ffc2cb8fa576dab213487';

    if (typeof Trello === 'undefined') {
        Trello = {};
    }

    var isAuthorized = false;
    trello.getBoard = function (boardId) {
        var deferred = $q.defer();
        authorized().then(function () {
            Trello.get('/boards/' + boardId, {'lists': 'open', 'cards': 'open', 'card_checklists': 'all'}, deferred.resolve, deferred.reject);
        });
        return deferred.promise;
    };

    trello.addComment = function (cardId, comment) {
        var deferred = $q.defer();
        authorized().then(function () {
            Trello.post('/cards/' + cardId + '/actions/comments', {text: comment}, deferred.resolve, deferred.reject);
        });
        return deferred.promise;
    };

    trello.getCard = function (cardId) {
        var deferred = $q.defer();
        authorized().then(function () {
            Trello.get('/cards/' + cardId, {}, deferred.resolve, deferred.reject);
        });
        return deferred.promise;
    };

    trello.getCardActions = function (cardId) {
        var deferred = $q.defer();
        authorized().then(function () {
            Trello.get('/cards/' + cardId + '/actions', {}, deferred.resolve, deferred.reject);
        });
        return deferred.promise;
    };

    function authorized() {
        var deferred = $q.defer();
        if (isAuthorized) {
            deferred.resolve();
        } else {
            Trello.authorize({name: 'Ward Council', type: 'popup', success: function(){
                    deferred.resolve();
            }, scope: {read: true, write: true, account: false}});
        }
        return deferred.promise;
    }

    return trello;
});