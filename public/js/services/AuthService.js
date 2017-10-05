export default class AuthService{


    /** @ngInject */
    constructor( $http, $q, $rootScope ){
        this.$q    = $q;
        this.$http = $http;
        this.$rootScope = $rootScope;
    }

    login( form ){
        let defer = this.$q.defer();
        this.$http.post("/login", form )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    alert(response.data.message);
                    defer.resolve(response.data.user);
                } else {
                    alert(response.data.message);
                    defer.reject();
                }
            });

        return defer.promise;
    }

    check(){
        let defer = this.$q.defer();
        this.$http.post("/auth", {} )
            .then( (response) => {
                if( response.data.code == "success" ){
                    this.$rootScope.loginInfo = response.data.user;
                    defer.resolve();
                }
            },( response ) => {
                defer.reject();
            });

        return defer.promise;
    }
}
