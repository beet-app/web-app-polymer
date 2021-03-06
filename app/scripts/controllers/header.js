﻿BeetApp
    .controller('HeaderController', function($scope, $rootScope,$sce, $http, $location, $translate, Login, Common,$state) {
        $scope.formData = {};

        $rootScope.languages = new Array("pt_br", "en", "es");

        Login.get()
            .success(function (data) {
                loadData(data);
            })
            .error(function (error) {
                $rootScope.loadingApp = false;
                $rootScope.login = true;

                setTimeout(function(){
                    $("#loadingApp").hide();
                    $("#login").fadeIn("slow");
                },2000);

            });
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

                    setTimeout(function(){
                        $("#loadingApp").hide();
                        $("#container").fadeIn("slow");
                        $("#header").fadeIn("slow");
                        $("#footer").fadeIn("slow");
                    },1000);
                    $state.transitionTo('home');
                })
                .error(function (error) {

                });


        }
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


        $scope.toggleDialog = function(strDialog){
            if ($rootScope.dialogCompany){
                $rootScope.dialogCompany = false;
            }else{
                $rootScope.dialogCompany = true;
            }

            //var d = document.querySelector("#" + strDialog);
            //d.toggle();
        };

        $rootScope.menutest = [
            {
                "description" : "Provas",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"contract",
                "background_color":"purple",
                "text_color":"white"
            },
            {
                "description" : "Correções",
                "url" : "accomodation",
                "icon_class" : "home",
                "flat_icon":"correction",
                "background_color":"blue",
                "text_color":"black"
            },
            {
                "description" : "Relatórios",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"graphics",
                "background_color":"yellow",
                "text_color":"black"
            },
            {
                "description" : "Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"student",
                "background_color":"grey",
                "text_color":"white"
            },
            {
                "description" : "Melhores Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"medal",
                "background_color":"green",
                "text_color":"black"
            },
            {
                "description" : "Calendário",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"calendar",
                "background_color":"red",
                "text_color":"white"
            },
            {
                "description" : "Turmas",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"class",
                "background_color":"blue",
                "text_color":"black"
            },
            {
                "description" : "Pesquisar",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"search",
                "background_color":"red",
                "text_color":"white"
            },
            {
                "description" : "Escolas",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"world",
                "background_color":"yellow",
                "text_color":"black"
            }      ,      {
                "description" : "Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"student",
                "background_color":"grey",
                "text_color":"white"
            },
            {
                "description" : "Melhores Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"medal",
                "background_color":"green",
                "text_color":"black"
            },
            {
                "description" : "Calendário",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"calendar",
                "background_color":"red",
                "text_color":"white"
            }
        ];

/*              
 {
 "description" : "Despesas",
 "url" : "expense",
 "icon_class" : "home",
 "flat_icon":"shopping",
 "background_color":"green",
 "text_color":"white"
 },
 {
 "description" : "Acomodação",
 "url" : "accomodation",
 "icon_class" : "home",
 "flat_icon":"accomodation",
 "background_color":"blue",
 "text_color":"white"
 },
 {
 "description" : "Avaliações",
 "url" : "expense",
 "icon_class" : "home",
 "flat_icon":"graphics",
 "background_color":"yellow",
 "text_color":"white"
 },
 {
 "description" : "Dados Gerais",
 "url" : "expense",
 "icon_class" : "home",
 "flat_icon":"form",
 "background_color":"grey",
 "text_color":"white"
 },
 {
 "description" : "Habilidades",
 "url" : "expense",
 "icon_class" : "home",
 "flat_icon":"star",
 "background_color":"purple",
 "text_color":"white"
 },
 {
 "description" : "Contratos",
 "url" : "expense",
 "icon_class" : "home",
 "flat_icon":"contract",
 "background_color":"red",
 "text_color":"white"
 }
		if ($location.path() != "/login"){
		    $(document).ready(function(){
		       $("#top-menu").show();
		       $("#sidebar").show();
		       $("#login-block").hide();
		    });		
		}




        Menu.get()
            .success(function(data) {
                $("#container-menu").show();
                $scope.menus = data;
            })
*/
    });




    function createHtml(attribute, data){
        var html = "";

        var value = "";

        if (attribute.group != undefined){

            if (data != undefined){
                if (data.attributes != undefined){
                    if (data.attributes[attribute.group.description] != undefined){
                        if (data.attributes[attribute.group.description] != undefined){
                            if (data.attributes[attribute.group.description][attribute.description] != undefined){
                                value = data.attributes[attribute.group.description][attribute.description];
                            }
                        }
                    }
                }
            }

            var strName = attribute.group.description + "." + attribute.description;
            var attr = "ng-model='" +strName+ "' id='" +strName+ "'";

            if (attribute.size != null){
                attr += "size='" +attribute.size+ "' ";
            }

            if (attribute.required){
                attr += "required ";
            }

            switch (attribute.type.template){
                case "TEXT":
                    html = "<input type='TEXT' "+attr+" value='"+value+"' class='form-control input-lg' />";
                    break;
                case "TEXTAREA":
                    html = "<textarea "+attr+">"+value+"</textarea>";
                    break;
                case "DROPDOWN":
                    html = "<select "+attr+">"

                    for (option in attribute.type.selection)
                    {
                        if (option != value) {
                            html += "<option value='" + option + "'>" + option + "</option>";
                        } else {
                            html += "<option value='" + option + "' selected>" + option + "</option>";
                        }
                    }
                    html += "</select>";
                    break;
                case "RADIO":
                    html = "<select class='form-control' "+attr+"><option value=''>Selecione</option>"
                    arrSelection = attribute.type.selection;
                    for (x=0;x<arrSelection.length;x++)
                    {
                        if (arrSelection[x] != value) {
                            html += "<option value='" + arrSelection[x] + "'>" + arrSelection[x] + "</option>";
                        } else {
                            html += "<option value='" + arrSelection[x] + "' selected>" + arrSelection[x] + "</option>";
                        }
                    }
                    html += "</select>";
                    break;

                case "DATE":
                    html = "<div class='input-append date' id='dpYears' data-date='"+value+"' data-date-format='dd/mm/yyyy' data-date-viewmode='years' style='width:200px;'>"
                         +      "<input class='form-control input-lg' style='width:160px;' type='text' "+attr+" value='"+value+"' readonly=''>"
                         +      "<img src='images/icons/calendar-icon.png' class=' add-on' style='margin-top:-8px;margin-left:-38px;' />"
                         + "</div>";

                    $(function(){
                        $('#dpYears').datepicker();
                    });
                  
                    break;

                    /*
                    arrSelection = attribute.type.selection;
                    html = "<div class='form-group'><div class='skin-section'>";

                    for (x=0;x<arrSelection.length;x++)
                    {
                        
                        if (arrSelection[x] != value) {
                            html += "";
                        } else {
                            html += "";
                        }

                        html += "<div class='ui-checkbox'><label class='ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-on'>"+arrSelection[x]+"</label><input type='checkbox' checked='' data-cacheval='false'></div>";
                    }
                    html += "</div></div>";


                    break;
                    */

            }
        }
        return html;
    }

function fillAttributes(){
    var objAttributes = new Object();
    var value="";
    var element;
    var template="";
    $("[model]").each(function(){
        arrName = $(this).attr("model").split(".");
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

