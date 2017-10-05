export default class PaperController{
    /** @ngInject */
    constructor($scope, PaperService){
        this.$scope         = $scope;
        this.PaperService = PaperService;
        this.selectPaper  = null;
        this.init();
    }

    init(){
        this.selectedPaper = null;
        this.form          = {};
        this.PaperService.selectPaperList({})
            .then(( result ) => {
                this.papers = result.docs;
                console.log(result);
            });
    }

    reset(){
        this.form = {};
        this.selectedPaper = null;
    }

    validate(){
        let messageMap = {
            "title" : "학습지제목을 입력해주세요",
            "question" : "문제를 등록해주세요",
        };

        if( this.$scope.paperForm.$error.length ){
            let fieldName = this.$scope.paperForm.$error.required[0].$name;
            alert(messageMap[fieldName]);
            return false;
        }

        return true;
    }

    submit(){

        if( !this.validate() ) return false;

        this.form.questions = this.form.question.split("\n");


        if( confirm("등록하시겠습니까?") ){
            this.PaperService.insertPaper(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
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
            this.PaperService.updatePaper(this.form)
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
            this.PaperService.deletePaper(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
                    this.init();
                    return ;
                });
        }
    }

}
