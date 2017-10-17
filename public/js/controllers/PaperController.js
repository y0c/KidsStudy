export default class PaperController{
    /** @ngInject */
    constructor($scope, PaperService, PaperGroupService, $filter){
        this.$scope            = $scope;
        this.PaperService      = PaperService;
        this.PaperGroupService = PaperGroupService;
        this.selectPaper       = null;
        this.$filter           = $filter;
        this.setGridOptions();
        this.init();
    }

    init(){
        this.selectPaper = null;
        this.form               = {};

        this.PaperGroupService.selectPaperGroupList({})
            .then( result => {
                this.paperGroups = result.paperGroupList;

                if( !this.searchGroupId )
                    this.searchGroupId = this.paperGroups[0].groupId;

                return this.PaperService.selectPaperList({
                    groupId : this.searchGroupId
                });
            })
            .then( result  => {
                this.papers           = result.paperList;
                this.gridOptions.data = this.papers;
                this.filter();
            });

    }

    setGridOptions(){
        let vm = this;
        this.gridOptions = {
            enableSorting : true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs : [
                { name : "학습지제목", field : "paperTitle" },
                { name : "단계", field : "step"},
                { name : "설명", field : "description"},
                { name : "연산", field : "operationType"},
                { name : "문제형식", field : "displayType"},
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
        this.form.operationType = "calculation";
        this.form.displayType   = "horizontal";
        this.selectedPaper = null;
    }

    filter(){
        let groupList = this.$filter("filter")( this.papers, { groupId : this.searchGroupId });
        this.gridOptions.data = this.$filter('filter')( groupList,  this.searchQuery);
    }


    validate(){
        let messageMap = {
            "paperTitle" : "학습지 제목을 입력해주세요",
            "step" : "단계를 입력해주세요",
            "question" : "문제를 입력해주세요"
        };

        if( this.$scope.paperForm.$error.required && this.$scope.paperForm.$error.required.length ){
            let fieldName = this.$scope.paperForm.$error.required[0].$name;
            alert(messageMap[fieldName]);
            return false;
        }

        return true;
    }

    submit(){

        if( !this.validate() ) return false;

        if( confirm("등록하시겠습니까?") ){
            this.form.groupId = this.searchGroupId;
            this.PaperService.insertPaper(this.form)
                .then( result => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }

    }


    select( paper ){
        this.PaperService.selectPaperOne(paper)
            .then( result => {
                this.selectedPaper = result.paper;
                this.selectedPaper.question = this.questionToString(result.questions);
                this.form = {};
                angular.copy( this.selectedPaper, this.form );
            });
    }

    questionToString( questions ){
        let questionText = "";

        questions.forEach( ( obj, idx ) => {
            questionText += obj.question + "\n";
        });

        return questionText;
    }

    modify(){
        if( !this.validate() ) return false;

        if( confirm("학습지그룹을 수정하시겠습니까?") ){
            this.form.originalGroupId = this.selectedPaper.groupId;
            this.PaperService.updatePaper(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }
    }

    delete(){

        if( confirm(this.selectedPaper.groupId + "그룹을 삭제하시겠습니까?") ){
            this.form.originalGroupId = this.selectedPaper.groupId;
            this.PaperService.deletePaper(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }
    }

}
