export default class LoginController{

    /** @ngInject */
    constructor($scope, AuthService, $state, $rootScope){
        this.$scope = $scope;
        this.AuthService  = AuthService;
        this.$state = $state;
        this.$rootScope = $rootScope;
    }

    login(){
        this.AuthService.login(this.formData)
            .then((user) => {
                this.$rootScope.loginInfo = user;
                let stateMap = {
                    admin : "admin.student",
                    student : "student.main"
                };
                
                this.$state.go(stateMap[user.role]);
            });
    }


}
