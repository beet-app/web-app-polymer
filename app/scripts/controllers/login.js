"use strict";
BeetApp
    .controller("LoginController", ["$scope","$rootScope", "$state", "Common","Login", function ($scope,$rootScope, $state, Common, Login) {
        $scope.formData = {};

        Login.get()
            .success(function (data) {
                loadData(data);
            })
            .error(function (error) {
                $rootScope.loadingApp = false;
                $rootScope.login = true;

                setTimeout(function(){
                    $("#loadingApp").hide();
                    $("#login").fadeIn("fast");
                },2000);

            });

        $scope.checkLogin = function() {
            if ($scope.formData.email != undefined) {
                Login.post($scope.formData)
                    .success(function(data) {
                        loadData(data);
                    })
                    .error(function(data) {
                        Common.showToastMessage("Dados Inválidos !");

                    });
            }
        };


        function loadData(data){
            $rootScope.session = {};
            $rootScope.session.user = data;
            Login.getCompanies()
                .success(function (companies) {
                    $rootScope.session.companies = companies;
                    $rootScope.session.company = companies[0];
                    $rootScope.session.menus = companies[0].menus;
                    $rootScope.session.menu = companies[0].menus[0];
                    $rootScope.loadingApp = false;
                    $rootScope.login = false;
                    $location.path('home');
                })
                .error(function (error) {

                });


        }
    }]);