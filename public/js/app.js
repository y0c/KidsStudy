import "../css/bootstrap.min.css";
import "../scss/common.scss";
import "../scss/admin.scss";
import "angular-ui-grid/ui-grid.min.css";
import 'font-awesome/scss/font-awesome.scss';
import "./templates/admin/main.tmpl.html";
import "./templates/admin/login.tmpl.html";

import StudentService from "./services/StudentService";
import StudentController from "./controllers/StudentController";
import LoginController from "./controllers/LoginController";
import AdminMainController from "./controllers/AdminMainController";
import PaperService from "./services/PaperService";
import PaperGroupService from "./services/PaperGroupService";
import AuthService from "./services/AuthService";
import PaperGroupController from "./controllers/PaperGroupController";
import PaperController      from "./controllers/PaperController";

import commonDirectives from "./directives/commonDirectives";

let app = angular.module("kidsStudy", [ 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection' ]);

app.config(
    /** @ngInject */
    ($stateProvider, $urlRouterProvider, $qProvider) => {
    
    $qProvider.errorOnUnhandledRejections(false);

    $stateProvider
        
        .state({
            name : "login",
            url : "/login",
            controller : "LoginController",
            controllerAs : "vm",
            templateUrl : "loginTemplate"  
        })
        .state({
            name : "admin",
            url : "/admin",
            controller : "AdminMainController",
            controllerAs : "main",
            templateUrl : "mainTemplate"
        })
        .state("admin.student", {
            url : "/student",
            views : {
                content : {
                    controller : "StudentController",
                    controllerAs : "content",
                    templateUrl : "studentAdminTemplate"
                }
            }
            
        })
        .state("admin.paperGroup",{
            url: '/paperGroup',
            views : {
                content : {
                    controller : "PaperGroupController",
                    controllerAs : "content",
                    templateUrl : "paperGroupTemplate"
                }
            }
        })
        .state("admin.paper",{
            url: '/paper',
            views : {
                content : {
                    controller : "PaperController",
                    controllerAs : "content",
                    templateUrl : "paperTemplate"
                }
            }
        });
    
    $urlRouterProvider.otherwise("/login");

});


app.service("StudentService", StudentService)
    .service("AuthService", AuthService)
    .service("PaperService", PaperService)
    .service("PaperGroupService", PaperGroupService)
    .controller("StudentController", StudentController)
    .controller("PaperGroupController", PaperGroupController)
    .controller("PaperController", PaperController)
    .controller("LoginController", LoginController)
    .controller("AdminMainController", AdminMainController);


    commonDirectives(app);
