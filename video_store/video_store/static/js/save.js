(function(){
    'use strict';
    angular
        .module('app')
        .service('saveObject', ['$http', '$q', saveObject]);

        function saveObject($http, $q){
            this.doCreate = function(data, urlPost){
                var deferred = $q.defer();
                var formData = new FormData();

                for (var key in data) {
                    formData.append(key, data[key]);
                }

                return $http.post(urlPost, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                })
                .success(function (res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(msg);
                })

                return deferred.promise;
            }
        }
    })();