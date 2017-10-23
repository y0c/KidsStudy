const BASE_URL = "/admin/student";

export default class StudentService{
    /** @ngInject */
    constructor( $http, $q ){
        this.$http = $http;
        this.$q    = $q;
    }

    selectStudentList( paramMap ){
        let defer = this.$q.defer();
        this.$http.get( BASE_URL , {} )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                }
            });
        return defer.promise;
    }

    selectStudentOne( paramMap ){
        let defer = this.$q.defer();
        this.$http.get( BASE_URL + "/" + paramMap.userId, {} )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                }
            });
        return defer.promise;
    }

    insertStudent( paramMap ){
        let defer = this.$q.defer();

        this.$http.post( BASE_URL , paramMap )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                }
            });

        return defer.promise;
    }


    updateStudent( paramMap ){
        let defer = this.$q.defer();

        this.$http.put( BASE_URL + "/" + paramMap.userId , paramMap )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                }
            });

        return defer.promise;
    }

    deleteStudent( paramMap ){
        let defer = this.$q.defer();

        this.$http.delete( BASE_URL + "/" + paramMap.userId )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                }
            });

        return defer.promise;
    }
}
