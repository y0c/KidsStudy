const BASE_URL = "/admin/paper";

export default class PaperService{
    /** @ngInject */
    constructor( $http, $q ){
        this.$http = $http;
        this.$q    = $q;
    }

    selectPaperList( paramMap ){
        let defer = this.$q.defer();
        this.$http.get( BASE_URL + "/" + paramMap.groupId , paramMap )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                    defer.reject();
                }
            });
        return defer.promise;
    }

    selectPaperOne( paramMap ){
        let defer = this.$q.defer();
        this.$http.get( BASE_URL + "/" + paramMap.groupId + "/" + paramMap.paperId, {} )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                    defer.reject();
                }
            });
        return defer.promise;
    }

    insertPaper( paramMap ){
        let defer = this.$q.defer();

        this.$http.post( BASE_URL , paramMap )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                    defer.reject();
                }
            });

        return defer.promise;
    }


    updatePaper( paramMap ){
        let defer = this.$q.defer();

        this.$http.put( BASE_URL + "/" + paramMap.paperId , paramMap )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                    defer.reject();
                }
            });

        return defer.promise;
    }

    deletePaper( paramMap ){
        let defer = this.$q.defer();

        this.$http.delete( BASE_URL + "/" + paramMap.paperId )
            .then( ( response ) => {
                if( response.data.code == "success" ){
                    defer.resolve( response.data );
                } else {
                    alert(response.data.message);
                    defer.reject();
                }
            });

        return defer.promise;
    }
}
