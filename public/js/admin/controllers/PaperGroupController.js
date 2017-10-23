export default class PaperGroupController{
    /** @ngInject */
    constructor($scope, PaperGroupService, $filter){
        this.$scope            = $scope;
        this.PaperGroupService = PaperGroupService;
        this.selectPaperGroup  = null;
        this.$filter           = $filter;
        this.setGridOptions();
        this.init();
    }

    init(){
        this.selectedPaperGroup = null;
        this.form               = {};
        this.PaperGroupService.selectPaperGroupList({})
            .then(( result ) => {
                this.paperGroups = result.paperGroupList;
                this.gridOptions.data = this.paperGroups;
            });
    }

    setGridOptions(){
        let vm = this;
        this.gridOptions = {
            enableSorting : true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs : [
                { name : "그룹명", field : "groupId" },
                { name : "그룹타이틀", field : "groupTitle"},
                { name : "생성일", field : "createdAt", cellFilter : "date:'yyyy-MM-dd'"},
                { name : "수정일", field : "updatedAt", cellFilter : "date:'yyyy-MM-dd'"}
            ],
            noUnselect : true,
            multiSelect : false,
            appScopeProvider : this,
            onRegisterApi : gridApi => {
                this.gridApi = gridApi;
                this.gridApi.selection.on.rowSelectionChanged(vm.$scope,function(row){
                    this.grid.appScope.select(row.entity);                     
                });
            }
        };
    }


    reset(){
        this.form = {};
        this.selectedPaperGroup = null;
    }

    filter(){
        this.gridOptions.data = this.$filter('filter')( this.paperGroups, this.searchQuery);
    }


    validate(){
        let messageMap = {
            "groupId" : "학습지 그룹명을 입력해주세요",
            "groupTitle" : "학습지 그룹타이틀을 입력해주세요",
        };

        if( this.$scope.paperGroupForm.$error.length ){
            let fieldName = this.$scope.paperGroupForm.$error.required[0].$name;
            alert(messageMap[fieldName]);
            return false;
        }

        return true;
    }

    submit(){

        if( !this.validate() ) return false;

        if( confirm("등록하시겠습니까?") ){
            this.PaperGroupService.insertPaperGroup(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }

    }


    select( paperGroup ){
        this.selectedPaperGroup = paperGroup;
        this.form = {};
        angular.copy( this.selectedPaperGroup, this.form );
    }

    modify(){
        if( !this.validate() ) return false;

        if( confirm("학습지그룹을 수정하시겠습니까?") ){
            this.form.originalGroupId = this.selectedPaperGroup.groupId;
            this.PaperGroupService.updatePaperGroup(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }
    }

    delete(){

        if( confirm(this.selectedPaperGroup.groupId + "그룹을 삭제하시겠습니까?") ){
            this.form.originalGroupId = this.selectedPaperGroup.groupId;
            this.PaperGroupService.deletePaperGroup(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }
    }

}
