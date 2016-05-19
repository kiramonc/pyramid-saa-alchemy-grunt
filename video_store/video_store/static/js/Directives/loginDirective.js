(function(){
    'use strict';

    angular
        .module('app')
        .directive('login', loginForm);

        function loginForm(){
            return {
                restrict: 'E',
                templateUrl: '/static/views/login.html'
            }
        }
})();