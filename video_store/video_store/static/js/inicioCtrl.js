(function(){
    'use strict';
    angular
        .module('app')
        .controller('inicioCtrl', inicioCtrl);

        function inicioCtrl(){
            var scope = this;
            scope.formData= {};
            scope.message = 'Bienvenido a la página de inicio';
        }
})();
