export default class StudentMainController{

    /** @ngInject */
    constructor( $scope, PaperService, $rootScope ){
        this.$scope = $scope;
        this.PaperService = PaperService;
        this.$rootScope   = $rootScope;
    }

    init(){
        this.username = this.$rootScope.loginInfo.username;
        this.PaperService.selectPaperList()
            .then( (result) => {
                this.papers = result.docs;
            });
    }



}
