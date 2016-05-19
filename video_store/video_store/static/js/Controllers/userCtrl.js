(function(){
    'use strict';
    angular
        .module('app')
        .controller('userCtrl', userCtrl);

        function userCtrl($http, $q, $route, $filter, $routeParams, localStorageService, NgTableParams,
        saveService, deleteService, editService, viewService, getService){
            var scope = this;
            var deferred = $q.defer();
            var foo = $route.current.foodata;
            scope.formData= {};
            scope.usuarios = [];
            scope.message = 'Bienvenido a la página de usuarios';
            if (localStorageService.get("ls.auth")) {
                scope.user_login= localStorageService.get("ls.auth");
            } else {
                scope.user_login="invitado";
            }
            scope.cols = [
            {value:"name", description:"Nombre", di_decima:""},
            {value:"age", description:"Edad", di_decima:1},
            {value:"money",description:"Dinero", di_decima:1},
            {value:"date_c",description:"Conexión", di_decima:""}
            ];

            scope.datos= [
            {name:"Juan", age:7, money:0, date_c: "11/04/10"},
            {name:"Maria", age:27, money:10, date_c: "12/12/11"},
            {name:"Jose", age:17, money:300, date_c: "10/10/11"},
            {name:"Pedro", age:19, money:452, date_c: "01/04/11"},
            {name:"Juan", age:34, money:-10, date_c: "04/12/11"},
            {name:"Pablo", age:58, money:629, date_c: "11/12/11"},
            {name:"Elizabeth", age:7, money:0, date_c: "11/01/11"},
            {name:"Sonia", age:27, money:10, date_c: "11/08/11"},
            {name:"Romel", age:17, money:300, date_c: "10/09/11"},
            {name:"Jaime", age:19, money:452, date_c: "08/10/11"},
            {name:"Kathy", age:34, money:-10, date_c: "08/11/11"},
            {name:"Sairy", age:58, money:629, date_c: "04/07/11"},
            {name:"Carina", age:7, money:0, date_c: "01/07/11"},
            {name:"Noemi", age:27, money:10, date_c: "06/04/11"},
            {name:"Silvia", age:17, money:300, date_c: "10/04/11"},
            {name:"Walter", age:19, money:452, date_c: "10/04/11"},
            {name:"Diego", age:34, money:-10, date_c: "02/11/10"},
            {name:"Jackson", age:58, money:629, date_c: "02/04/11"},
            {name:"Diego", age:7, money:0, date_c: "03/07/11"},
            {name:"Jorge", age:27, money:10, date_c: "03/04/11"},
            {name:"Ginsop", age:17, money:300, date_c: "01/04/11"},
            {name:"Jorge", age:19, money:452, date_c: "07/04/14"},
            {name:"Borys", age:34, money:-10, date_c: "09/04/11"},
            {name:"Jefferson", age:58, money:629, date_c: "11/04/11"}
            ];

            scope.displayCollection = [].concat(scope.datos);

            console.log(typeof(2));

            scope.isColNumeric = function(value){
                if(typeof(value)=="number"){
                    return true;
                }
                return false;
            }

            scope.tipo = function(value){
                return typeof(value);
            }



            scope.predicates=[];
        scope.lst_filters = [];
        scope.columnas = [];
        for (var col=0; col<scope.cols.length; col++) {
            scope.predicates.push(scope.cols[col]);
        }
        for (var col=0; col<scope.cols.length; col++) {
            scope.columnas.push({ field: scope.cols[col]['value'], title: scope.cols[col]['description'], decim: scope.cols[col]['di_decima'], show: true, sortable: scope.cols[col]['value'], filter_data:scope.lst_filters});
        }
        scope.selectedPredicate = scope.predicates[0];
        scope.comparativasNumber = [
            {name:'mayor a', name_fn:'mayor'},
            {name:'menor a', name_fn:'menor'},
            {name:'igual a', name_fn:'igual'}];
        scope.comparativasCadena = [
            {name: 'contiene', name_fn:'contain' },
            {name:'igual a', name_fn:'equals'}
        ];
        scope.comparativasDate = [
            {name: 'antes de', name_fn:'antes' },
            {name:'después de', name_fn:'despues'},
            {name:'igual a', name_fn:'in'}
        ];
        scope.selectedComparativa = scope.comparativasCadena[1];

        scope.tableParams = new NgTableParams({
            page:1,
            count: 10 // count per page
        }, {
            getData: function ($defer, params) {
                var out = [];
                for (var i=0; i<scope.datos.length; i++) {
                    var p = scope.datos[i]
                    var bandera = true;
                    if (scope.lst_filters.length == 0) {
                        out.push(p)
                    } else {
                        bandera = true;
                        for (var filt = 0; filt < scope.lst_filters.length; filt++) {
                            var argum = scope.lst_filters[filt];
                            if (argum.name_fn == 'equals') {
                                if (p[argum.campo].toLowerCase() == argum.value.toLowerCase()) {
                                    bandera = bandera && true;
                                }else{
                                    bandera = bandera && false;
                                }
                            } else {
                                if (argum.name_fn == 'contain') {
                                    if ((p[argum.campo]).toLowerCase().indexOf(argum.value.toLowerCase()) > -1) {
                                        bandera = bandera && true;
                                    }else {
                                        bandera = bandera && false;
                                    }
                                } else {
                                    if (argum.name_fn == 'mayor') {
                                        if (p[argum.campo] > argum.value) {
                                            bandera = bandera && true;
                                        }else {
                                            bandera = bandera && false;
                                        }
                                    } else {
                                        if (argum.name_fn == 'menor') {
                                            if (p[argum.campo] < argum.value) {
                                                bandera = bandera && true;
                                            }else {
                                                bandera = bandera && false;
                                            }
                                        } else {
                                            if (argum.name_fn == 'igual') {
                                                if (p[argum.campo] == argum.value) {
                                                    bandera = bandera && true;
                                                }else {
                                                    bandera = bandera && false;
                                                }
                                            } else {
                                                if (argum.name_fn == 'antes') {
                                                    var fechaP= Date.parse(p[argum.campo]);
                                                    var fechaComp= Date.parse(argum.value);
                                                    if (fechaP < fechaComp) {
                                                        bandera = bandera && true;
                                                    } else {
                                                        bandera = bandera && false;
                                                    }
                                                } else {
                                                    if (argum.name_fn == 'despues') {
                                                        var fechaP= Date.parse(p[argum.campo]);
                                                        var fechaComp= Date.parse(argum.value);
                                                        if (fechaP > fechaComp)  {
                                                            bandera = bandera && true;
                                                        } else {
                                                            bandera = bandera && false;
                                                        }
                                                    } else {
                                                        if (argum.name_fn == 'in') {
                                                            var parts = p[argum.campo].split("/");
                                                            var fechaP= new Date(parts[2], parts[1] - 1, parts[0]);
                                                            parts = argum.value.split("/");
                                                            var fechaComp= new Date(parts[2], parts[1] - 1, parts[0]);
                                                            if (fechaP.getDate() == fechaComp.getDate() && fechaP.getMonth() == fechaComp.getMonth() && fechaP.getYear() == fechaComp.getYear()) {
                                                                bandera = bandera && true;
                                                            } else {
                                                                bandera = bandera && false;
                                                            }
                                                        } else {
                                                            bandera = bandera && true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(bandera){
                            out.push(p);
                        }
                    }
                }
                // Ordenacion para la paginacion
                var orderedData = params.sorting() ? $filter('orderBy')(out, params.orderBy()) : data;
                params.total(orderedData.length)
                $defer.resolve(orderedData.slice(
                    (params.page() - 1) * params.count(), params.page() * params.count()
                ));
            }
        });
        // func agrega filtros
        scope.changeFilter = function(field, value,funcion){
            var filter = {};
            filter[field] = value;
            scope.lst_filters.push({campo:field, value:value, name_fn:funcion['name_fn']})
            angular.extend(scope.tableParams.filter(), filter);
            scope.tableParams.reload();
            scope.inputvalorbusq = "";
        }
        // IMPLEMENTAR FUNCION DELETE
        scope.deleteFilter = function(pos_item){
            scope.tableParams.filter();
            scope.lst_filters.splice(pos_item, 1);
            var filter = {};
            for(var i=0; i < scope.lst_filters.length; i++){
                filter[scope.lst_filters[i].campo] = scope.lst_filters[i].value;
            }
            scope.tableParams.filter({});
            angular.extend(scope.tableParams.filter(), filter);
        }
        scope.clear_filters = function(){
            scope.lst_filters = [];
            scope.tableParams.filter({});
        }
        scope.tipoPrueba =  "";
        scope.vertipo = function(dato){
            if(typeof(dato)=='string'){
                if(Date.parse(dato).toString()!='NaN'){
                    return 'date';
                }
            }
            return typeof(dato);
        };
        scope.iniciarSelect = function(tipo){
            if(tipo=='string'){
                scope.selectedComparativa = scope.comparativasCadena[1];
            }else{
                if(tipo=='number'){
                    scope.selectedComparativa = scope.comparativasNumber[0];
                }else{
                    if(tipo=='date'){
                        scope.selectedComparativa = scope.comparativasDate[0];
                    }
                }
            }
        }








            // Al cargar pag se pide lista de usuarios
            if(foo == "list"){
                getService.doGet('/users-data')
                .success(function (res){
                    scope.usuarios = res.users;
                }).error(function(res){});
            }else{
                if(foo == "select"){ // Al cargar la página se pide datos usuario
                    getService.doGet('/users/'+ $routeParams.param1)
                    .success(function (res){
                        scope.formData = res.user;
                    }).error(function(res){});
                }
            }

            // Redirecciona a la vista crear
            scope.getNew = function(){
                viewService.doCheck('/users/new')
                .success(function (res){
                    window.location="#/new_user";
                }).error(function(res){});
            }

            // Exportar datos
            scope.export_excel = function(){
                $http.head('/export_data')
                .success(function (res){
                    console.log("Exito");
                }).error(function(res){
                    console.log("Error");
                })
            }

            // Redirecciona a la vista editar
            scope.verUser = function(id){
                viewService.doCheck('/users/'+ id)
                .success(function (res){
                    window.location="#/user/"+id;
                }).error(function(res){});
            }

            // Enviar usuario al service save
            scope.createUser = function(){
                saveService.doCreate(scope.formData, '/users/new')
                .success(function (res){
                    scope.formData={};
                    window.location="#/users";
                }).error(function(res){})
            }

            // Enviar usuario al service edit
            scope.editUser = function(){
                editService.doEdit(scope.formData, '/users/'+scope.formData.id)
                .success(function (res){
                    scope.formData={};
                    window.location="#/users";
                }).error(function(res){})
            }

            // Enviar solicitud de eliminar al service delete
            scope.deleteUser = function(id){
                deleteService.doDelete('/users/'+id)
                .success(function (res){
                    scope.usuarios = res.users;
                }).error(function(res){})
            }

        } // controlador
})();
