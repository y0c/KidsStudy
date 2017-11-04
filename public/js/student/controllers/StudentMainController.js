export default class StudentMainController{

    /** @ngInject */
    constructor( $scope, StudentMainService , $rootScope, $stateParams ){
        this.$scope = $scope;
        this.StudentMainService = StudentMainService;
        this.$rootScope   = $rootScope;
        this.$stateParams  = $stateParams;
        this.init();   
    }

    init(){
        this.username = this.$rootScope.loginInfo.userName;
        this.StudentMainService.selectMyInfo()
            .then( (result) => {
                this.currentStudent = result.student;
                this.paperGroupList = result.paperGroupList;
            });

        if ( this.$stateParams && this.$stateParams.hasOwnProperty("groupId") ){
            this.StudentMainService.findAllPaper({ groupId : this.$stateParams.groupId })
                .then( data => {
                    this.paperList = data.paperList;

                });
        }
    }



}
