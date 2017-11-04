export default class StudentPaperGroupController{

    /** @ngInject */
    constructor( $scope, StudentMainService , $rootScope, $stateParams ){
        this.$scope = $scope;
        this.StudentMainService = StudentMainService;
        this.$stateParams  = $stateParams;
        this.init();   
    }

    init(){

        this.StudentMainService.findAllPaper({ groupId : this.$stateParams.groupId })
            .then( data => {
                this.paperList = data.paperList;

            });
    }



}
