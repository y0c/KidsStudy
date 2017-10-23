import "../css/bootstrap.min.css";
import "../scss/common.scss";
import "../scss/admin.scss";
import "../scss/student.scss";
import "angular-ui-grid/ui-grid.min.css";
import 'font-awesome/scss/font-awesome.scss';
import "./admin/templates/main.tmpl.html";
import "./common/templates/login.tmpl.html";
import "./student/templates/main.tmpl.html";

import StudentService from "./admin/services/StudentService";
import StudentController from "./admin/controllers/StudentController";
import LoginController from "./common/controllers/LoginController";
import AdminMainController from "./admin/controllers/AdminMainController";
import PaperService from "./admin/services/PaperService";
import PaperGroupService from "./admin/services/PaperGroupService";
import AuthService from "./common/services/AuthService";
import PaperGroupController from "./admin/controllers/PaperGroupController";
import PaperController      from "./admin/controllers/PaperController";

import commonDirectives from "./common/directives/commonDirectives";

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
        .state({
            name : "student",
            url : "/student",
            controller : "StudentMainController",
            controllerAs : "main",
            templateUrl : "studentMainTemplate"
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
