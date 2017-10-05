import "../css/bootstrap.min.css";
import "../scss/common.scss";
import "../scss/admin.scss";
import 'font-awesome/scss/font-awesome.scss';
import "./templates/main.tmpl.html";
import StudentService from "./services/StudentService";
import StudentController from "./controllers/StudentController";
import PaperService from "./services/PaperService";
import PaperController from "./controllers/PaperController";

let app = angular.module("kidsStudyAdmin", [ 'ui.router', 'ui.bootstrap' ]);

app.config(
    /** @ngInject */
    ($stateProvider, $urlRouterProvider) => {

    $stateProvider
        .state({
            name: 'student',
            url: '/student',
            templateUrl : 'studentMain',
            controller : "StudentController",
            controllerAs : "student"
        })
        .state({
            name: 'paper',
            url: '/paper',
            controller : "PaperController",
            controllerAs : "paper",
            templateUrl : "paperMain"
        });

    $urlRouterProvider.otherwise("/student");

});


app.service("StudentService", StudentService);
app.controller("StudentController", StudentController);
app.service("PaperService", PaperService);
app.controller("PaperController", PaperController);
