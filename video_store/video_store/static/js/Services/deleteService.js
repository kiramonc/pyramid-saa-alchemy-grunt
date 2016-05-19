(function(){
    'use strict';

    angular
        .module('app')
        .service('deleteService', ['$http', '$q', deleteService]);

        function deleteService($http, $q){
            this.doDelete = function(urlPost){
                var deferred = $q.defer();

                return $http.delete(urlPost)
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(msg);
                    window.location="#/error/"+code;
                })

                 return deferred.promise;
            }
        }
})();