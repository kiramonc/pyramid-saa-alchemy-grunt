(function(){
    'use strict';

    angular
        .module('app')
        .directive('menu', menu);

        function menu(){
            return {
                restrict: 'E',
                templateUrl: '/static/views/menu.html'
            }
        }
})();