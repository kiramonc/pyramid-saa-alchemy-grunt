(function(){
    'use strict';
    angular
        .module('app')
        .controller('errorCtrl', errorCtrl);

        function errorCtrl($routeParams,localStorageService){
            var scope = this;
            scope.message = 'Error';
            scope.title = '';
            scope.description = '';
            scope.solution = '';
            scope.code = $routeParams.param1;

            if (localStorageService.get("ls.auth")) {
                scope.user_login= localStorageService.get("ls.auth");
            } else {
                scope.user_login="invitado";
            }
            // console.clear();

            if(scope.code == 401){
                scope.title = "HTTP Unauthorized"
                scope.message = "Access is denied due to invalid credentials"
                scope.description = "You do not have permission to view this directory or page using the credentials that you supplied"
                scope.solution = "Vuelva a logearse con una cuenta que tenga los permisos"
            }else{
                if(scope.code == 404){
                    scope.title = "HTTP Not Found"
                    scope.message = "The page cannot be found"
                    scope.description = "The page you are looking for might have been removed, had its name changed or is temporarily unavailable"
                    scope.solution = "Compruebe que la url sea correcta"
                }
            }
        }
})();
