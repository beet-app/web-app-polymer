"use strict";
BeetApp
    .controller("HeaderCtrl", ["$rootScope","$q", "$state", "$scope","Login", "Common", function ($rootScope,$q, $state, $scope, Login, Common) {

        $rootScope.languages = new Array("pt_br", "en", "es");

        $rootScope.dialogCompany = false;

        $scope.changeCompany = function(intIndex) {
            $rootScope.session.menus = $rootScope.session.companies[intIndex].menus;
            $rootScope.session.company = $rootScope.session.companies[intIndex];
            $("#modal-companies-close").trigger("click");
            $scope.toggleDialog();
            $location.path('home');

        };

        $scope.changeMenu = function(menu) {
            $rootScope.session.menu = menu;
            $location.path(menu.url);
        };

        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };


        $rootScope.createHtmlElement = function(attribute, data){
            var strHtml = createHtml(attribute, data);
            return $sce.trustAsHtml(strHtml);
        };

    }]);

function fillAttributes(){
    var objAttributes = new Object();
    var value="";
    var element;
    var template="";
    $("[model]").each(function(){
        var arrName = $(this).attr("model").split(".");
        if (objAttributes[arrName[0]] == undefined){
            objAttributes[arrName[0]] = new Object();
        }
        if ($(this).attr("template")){
            template = $(this).attr("template").toLowerCase();
        }else{
            template = "";
        }

        if (template != "radio" && template != "dropdown"){
            value = $(this).val();
        }else{
            value = document.querySelector('[model="'+$(this).attr("model") + '"]').selected;
        }
        objAttributes[arrName[0]][arrName[1]] = value;
    });
    return objAttributes;
}

