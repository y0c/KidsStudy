//CSS Vendor
import "../css/bootstrap.min.css";
import 'font-awesome/scss/font-awesome.scss';

//CSS Custom
import "../scss/common.scss";
import "../scss/student.scss";

//Templates
import "./templates/student_login.tmpl.html";
import "./templates/student_main.tmpl.html";

//Angular Class
import LoginController from "./controllers/LoginController";
import StudentMainController from "./controllers/StudentMainController";
import StudentPaperController from "./controllers/StudentPaperController";
import AuthService from "./services/AuthService";
import PaperService from "./services/PaperService";

let app = angular.module("kidsStudyStudent", [ 'ui.router', 'ui.bootstrap' ]);

app.config(
    /** @ngInject */
    ($stateProvider, $urlRouterProvider, $qProvider) => {

    $qProvider.errorOnUnhandledRejections(false);

    let auth = {
        /** @ngInject */
        auth : ( AuthService, $state ) => {
            return AuthService.check()
                .then( () => {}
                , () => {
                    alert("로그인 후 이용하실수 있습니다.");
                    $state.go("login");
                });

        }
    };

    $stateProvider
        .state({
            name: 'login',
            url: '/login',
            templateUrl : 'loginTemplate',
            controller : "LoginController",
            controllerAs : "vm"
        })
        .state({
            name: 'main',
            url: '/',
            controller : "StudentMainController",
            controllerAs : "main",
            templateUrl : "mainTemplate",
            resolve : auth
        })
        .state("main.papers",{
            // parent : "main",
            url : "papers",
            views : {
                "content" : {
                    templateUrl : "mainContentTemplate"
                }
            }
        })
        .state("main.paper", {
            url : "paper/:paperid",
            views : {
                "content" : {
                    templateUrl : "paperDetailTemplate",
                    controller : "StudentPaperController",
                    controllerAs : "content"
                }
            }
        });

    $urlRouterProvider.otherwise("/login");

});


app.controller("StudentMainController", StudentMainController)
   .controller("LoginController", LoginController)
   .controller("StudentPaperController", StudentPaperController)
   .service("AuthService", AuthService )
   .service("PaperService", PaperService);
