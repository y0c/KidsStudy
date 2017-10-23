export default class StudentMainController{

    /** @ngInject */
    constructor( $scope, StudentService , $rootScope ){
        this.$scope = $scope;
        this.StudentService = StudentService;
        this.$rootScope   = $rootScope;
        
    }

    init(){
        this.username = this.$rootScope.loginInfo.username;
        this.StudentService.selectStudentOne({
            userId : this.$rootScope.loginInfo.userId
        })
            .then( (result) => {
                this.currentStudent = result.student;
                this.paperGroupList = result.paperGroupList;
            });
    }



}
