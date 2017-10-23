export default class StudentPaperController{

    /** @ngInject */
    constructor( $scope, PaperService, $stateParams ){
        this.$scope         = $scope;
        this.PaperService   = PaperService;
        this.$stateParams   = $stateParams;
    }

    init(){
        this.questionResult = [];

        this.PaperService.selectPaperOne({ _id : this.$stateParams.paperid })
            .then( ( result ) => {
                this.paper = result.doc;
                this.reset();

                console.log(result.doc);
            });
    }

    mark(){
        let question = null;
        let correctCount = 0;
        for( let i = 0 ; i < this.paper.questions.length ; i ++ ){
            question = this.paper.questions[i];
            if( question.indexOf("*") == -1 && question.indexOf("/") == -1 ){
                let correct = eval(question);
                let questionResult = this.questionResult[i];

                if( typeof parseInt(questionResult.answer) !== "number" ){

                } else {
                    if( correct == questionResult.answer ){
                        questionResult.correctYn = "Y";
                        correctCount ++;
                    } else {
                        questionResult.correctYn = "N";
                    }
                }
            }
        }

        let total = ( 100 / this.paper.questions.length ) * correctCount;
        alert(`총 ${this.paper.questions.length}개 문제중에 ${correctCount}개를 맞췄어요!\n  ${ Math.ceil(total) }점이네요`);

    }


    isCorrect( result ){
        if( result.correctYn == 'Y' ){
            return "correct";
        } else if ( result.correctYn == 'N' ){
            return "incorrect";
        }
        return "";
    }

    reset(){
        angular.forEach( this.paper.questions, ( value ) => {
            this.questionResult.push({});
        });

    }


}
