(function(){
    'use strict';
    angular
        .module('app')
        .service('getService', ['$http', '$q', getService]);

        function getService($http, $q){
            this.doGet = function(urlPost){
                var deferred = $q.defer();

                return $http.get(urlPost)
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