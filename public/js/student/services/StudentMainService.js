
export default class StudentMainService {
    
    /** @ngInject */
    constructor( $http, $q ){
        this.$http = $http;
        this.$q    = $q;
    }

    selectMyInfo(){
        let defer = this.$q.defer();
        this.$http.get( "/student/me" , {} )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                }
            });
        return defer.promise;
    }

    findAllPaper( paramMap ){
        let defer = this.$q.defer();
        this.$http.get(`/student/paperGroup/${paramMap.groupId}`, {} )
            .then( response => {
                if( response.data.code == "success" ){
                    defer.resolve(response.data);
                } else {
                    alert(response.data.message);
                }
            });

        return defer.promise;
    }
}