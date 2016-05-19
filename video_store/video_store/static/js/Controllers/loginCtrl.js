(function(){
    'use strict';
    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

        function loginCtrl(saveService, localStorageService){
            var scope = this;
            scope.user= {};
            scope.mess = '';
            if (localStorageService.get("ls.auth")) {
                scope.user_login= localStorageService.get("ls.auth");
            } else {
                scope.user_login="invitado";
            }


            scope.login = function(){
                saveService.doCreate(scope.user, '/login').then(function(res){
                    scope.user = {};
                    if(res.data == "invitado"){
                        scope.mess = "Incorrect user or password";
                    }else{
                        scope.mess = '';
                        scope.user_login = res.data+"";
                        localStorageService.set("ls.auth", scope.user_login);
                    }
                })
            }

            scope.logout = function(){
                saveService.doCreate(scope.user_login, '/logout').then(function(res){
                    scope.user_login = "invitado";
                    localStorageService.remove("ls.auth");
                     //window.location = "#/";
                })
            }
        }
})();
