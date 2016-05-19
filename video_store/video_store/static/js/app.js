angular
    .module('app', ['ngRoute', 'LocalStorageModule', 'smart-table', 'ngTable'])
    .config(function($routeProvider, localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
        $routeProvider
        .when('/', {
            controller: 'inicioCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/inicio.html'
        })
        .when('/error/:param1', {
            controller: 'errorCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/error.html'
        })
        .when('/users', {
            controller: 'userCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/users.html',
            foodata: 'list'
        })
        .when('/new_user', {
            controller: 'userCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/add_user.html',
            foodata: 'new'
        })
        .when('/user/:param1', {
            controller: 'userCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/edit_user.html',
            foodata: 'select'
        })
        .otherwise({
            redirectTo: '/error/404'
        });

    });