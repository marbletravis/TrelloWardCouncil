angular.module('church', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('church').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('ward-council', {
        url: '/ward-council',
        templateUrl: 'partial/ward-council/ward-council.html'
    });
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html'
    });
    $stateProvider.state('ward-council-print', {
        url: '/ward-council/{agenda}/print',
        templateUrl: 'partial/ward-council-print/ward-council-print.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('church').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
