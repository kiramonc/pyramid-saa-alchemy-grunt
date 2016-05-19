(function(){
    'use strict';
    angular
        .module('app')
        .service('viewService', ['$http', '$q', viewService]);

        function viewService($http, $q){
            this.doCheck = function(urlPost){
                var deferred = $q.defer();

                return $http.head(urlPost)
                .success(function (res){
                    deferred.resolve(res);
                }).error(function(msg, code){
                    deferred.reject(msg);
                    window.location="#/error/"+code;
                })

                return deferred.promise;
            }
        }
    })();