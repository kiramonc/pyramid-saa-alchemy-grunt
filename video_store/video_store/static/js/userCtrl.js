(function(){
    'use strict';
    angular
        .module('app')
        .controller('userCtrl', userCtrl);

        function userCtrl($http, $q, $routeParams, $location, saveObject, deleteObject, editObject){
            var scope = this;
            var deferred = $q.defer();
            scope.formData= {};
            scope.usuarios = [];
            scope.message = 'Bienvenido a la página de usuarios';

            // Al cargar pag se pide la lista de usuarios
            if($location.path() == "/users"){
                $http.get('/users-data')
                .then(function(data){
                    scope.usuarios = data.data.users;
                });
            }else{
                var param = $routeParams.param1
                if(param != undefined){
                    $http.get('/users/'+ param)
                    .then(function (res) {
                        scope.formData = res.data.user;
                    });
                }
            }

            // Enviar usuario al service save
            scope.createUser = function(data){
                saveObject.doCreate(scope.formData, '/users/new').then(function(res){
                    scope.formData={};
                    window.location="#/users";
                })
            }

            // Solicita datos usuario al API
            scope.verUser = function(id){
                window.location="#/user/"+id;
            }

            // Enviar usuario al service edit
            scope.editUser = function(){
                editObject.doEdit(scope.formData, '/users/'+scope.formData.id).then(function(res){
                    scope.formData={};
                    window.location="#/users";
                })
            }

            // Enviar solicitud de eliminar al service delete
            scope.deleteUser = function(id){
                deleteObject.doDelete('/users/'+id).then(function(res){
                    console.log(res)
                    scope.usuarios = res.data.users;
                })
            }

        } // controlador
})();
