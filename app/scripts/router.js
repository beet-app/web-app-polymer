"use strict";
BeetApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.defaults.withCredentials = true;
    //$locationProvider.html5Mode(true);

    $httpProvider.responseInterceptors.push(function($q, $location) {

        return function(promise) {
            return promise.then(
                // Success: just return the response
                function(response){
                    return response;
                },
                // Error: check the error status to get only the 401
                function(response) {
                    if (response.status === 401){
                        $location.url('/login');
                    }
                    return $q.reject(response);
                }
            );
        }
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            controller: 'LoginController'
        })

        .state('logout', {
            url: '/logout',
            controller: 'LogoutController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignupController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .state('menu', {
            url: '/menu',
            templateUrl: 'views/menu/menu.html',
            controller: 'MenuController'
        })

        .state('person/create', {
            url: '/person/create',
            templateUrl: 'views/person/person.html',
            controller: 'PersonController'
        })

        .state('person/edit', {
            url: '/person/edit/:_id',
            templateUrl: 'views/person/person.html',
            controller: 'PersonController'
        })

        .state('person', {
            url: '/person',
            templateUrl: 'views/person/person.html',
            controller: 'PersonController'
        })

        .state('company/create', {
            url: '/company/create',
            templateUrl: 'views/company/company.html',
            controller: 'CompanyController'
        })

        .state('company/edit', {
            url: '/company/edit/:_id',
            templateUrl: 'views/company/company.html',
            controller: 'CompanyController'
        })

        .state('company/list', {
            url: '/company/list',
            templateUrl: 'views/company/list.html',
            controller: 'CompanyController'
        })

        .state('user/edit', {
            url: '/user/edit/:_id',
            templateUrl: 'views/user/user.html',
            controller: 'UserController'
        })

        .state('expense', {
            url: '/expense',
            templateUrl: 'views/expense/expense.html',
            controller: 'ExpenseController'
        });


});










