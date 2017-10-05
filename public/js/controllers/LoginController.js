export default class LoginController{

    /** @ngInject */
    constructor($scope, AuthService, $state, $rootScope){
        this.$scope = $scope;
        this.AuthService  = AuthService;
        this.$state = $state;
        this.$rootScope = $rootScope;
    }

    login(){
        this.AuthService.login(this.form)
            .then((user) => {
                this.$rootScope.loginInfo = user;
                this.$state.go("main.papers");
            });
    }


}
