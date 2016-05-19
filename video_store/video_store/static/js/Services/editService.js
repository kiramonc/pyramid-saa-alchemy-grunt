(function(){
    'use strict';
    angular
        .module('app')
        .service('editService', ['$http', '$q', editService]);

        function editService($http, $q){
            this.doEdit = function(data, urlPost){
                var deferred = $q.defer();
                var formData = new FormData();

                for (var key in data) {
                    formData.append(key, data[key]);
                }

                return $http.put(urlPost, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                })
                .success(function (res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(code);
                    window.location="#/error/"+code;
                })

                return deferred.promise;
            }
        }
    })();