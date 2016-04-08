(function(){
    'use strict';

    angular
        .module('app')
        .service('deleteObject', ['$http', '$q', deleteObject]);

        function deleteObject($http, $q){
            this.doDelete = function(urlPost){
                var deferred = $q.defer();

                return $http.delete(urlPost)
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(msg);
                })

                 return deferred.promise;
            }
        }
})();