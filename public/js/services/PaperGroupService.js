const BASE_URL = "/admin/paperGroup";

export default class PaperGroupService{
    /** @ngInject */
    constructor( $http, $q ){
        this.$http = $http;
        this.$q    = $q;
    }

    selectPaperGroupList( paramMap ){
        let defer = this.$q.defer();
        this.$http.get( BASE_URL , paramMap )
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

    selectPaperGroupOne( paramMap ){
        let defer = this.$q.defer();
        this.$http.get( BASE_URL + "/" + paramMap.groupId, {} )
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

    insertPaperGroup( paramMap ){
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


    updatePaperGroup( paramMap ){
        let defer = this.$q.defer();

        this.$http.put( BASE_URL , paramMap )
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

    deletePaperGroup( paramMap ){
        let defer = this.$q.defer();

        this.$http.delete( BASE_URL + "/" + paramMap.groupId )
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
