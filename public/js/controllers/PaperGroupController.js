export default class PaperGroupController{
    /** @ngInject */
    constructor($scope, PaperGroupService){
        this.$scope            = $scope;
        this.PaperGroupService = PaperGroupService;
        this.selectPaper       = null;
        this.setGridOptions();
        this.init();
    }

    init(){
        this.selectedPaperGroup = null;
        this.form               = {};
        this.PaperGroupService.selectPaperGroupList({})
            .then(( result ) => {
                this.papers = result.paperGroupList;
                this.gridOptions.data = this.papers;
                console.log(result);
            });
    }

    setGridOptions(){
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
                // this.gridApi.selection.on.rowSelectionChanged(vm.$scope,function(row){
                    // this.grid.appScope.select(row.entity);                     
                // });
            }
        };
    }


    reset(){
        this.form = {};
        this.selectedPaper = null;
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


    select( paper ){
        this.selectedPaper = paper;
        this.form = {};
        angular.copy( this.selectedPaper, this.form );
        if( this.form.questions.length ){
            this.form.question = this.form.questions.join("\n");
        }
    }

    modify(){
        if( !this.validate() ) return false;

        this.form.questions = this.form.question.split("\n");

        if( confirm("정보를 수정하시겠습니까?") ){
            this.PaperGroupService.updatePaper(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
                    this.init();
                    return ;
                });
        }
    }

    delete(){

        if( confirm(this.selectedPaper.title + "학습지를 삭제하시겠습니까?") ){
            this.PaperGroupService.deletePaper(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
                    this.init();
                    return ;
                });
        }
    }

}
