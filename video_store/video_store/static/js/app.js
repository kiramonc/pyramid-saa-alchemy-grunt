angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            controller: 'inicioCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/inicio.html'
        })
        .when('/users', {
            controller: 'userCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/users.html'
        })
        .when('/new_user', {
            controller: 'userCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/add_user.html'
        })
        .when('/user/:param1', {
            controller: 'userCtrl',
            controllerAs: "ctrl",
            templateUrl: '/static/views/edit_user.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    });