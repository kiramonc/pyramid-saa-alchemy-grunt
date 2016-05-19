(function(){
    'use strict';
    angular
        .module('app')
        .controller('inicioCtrl', inicioCtrl);

        function inicioCtrl(localStorageService){
            var scope = this;
            scope.message = 'Bienvenido a la página de inicio';
            scope.user_login="";

            if (localStorageService.get("ls.auth")) {
                scope.user_login= localStorageService.get("ls.auth");
            } else {
                scope.user_login="invitado";
            }
            console.log(scope.user_login)


        }
})();
