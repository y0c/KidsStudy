export default class StudentController{
    /** @ngInject */
    constructor($scope, StudentService){
        this.$scope         = $scope;
        this.StudentService = StudentService;
        this.selectStudent  = null;
        this.init();
    }

    init(){
        this.StudentService.selectStudentList({})
            .then(( result ) => {
                this.students = result.docs;
                console.log(result);
            });
    }

    reset(){
        this.form = {};
        this.selectedStudent = null;
    }

    validate(){
        let messageMap = {
            "userid" : "학생아이디를 입력해주세요",
            "username" : "학생이름을 입력해주세요",
            "password" : "비밀번호를 입력해주세요",
            "passwordConfirm" :  "비밀번호 확인을 입력해주세요"
        };

        if( this.$scope.studentForm.$error.length ){
            let fieldName = this.$scope.studentForm.$error.required[0].$name;
            alert(messageMap[fieldName]);
            return false;
        }


        if( this.form.password != this.form.passwordConfirm ){
            alert("비밀번호가 일치하지않습니다.");
            return false;
        }

        return true;
    }

    submit(){

        if( !this.validate() ) return false;

        if( confirm("등록하시겠습니까?") ){
            this.StudentService.insertStudent(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
                    this.init();
                    return ;
                });
        }

    }


    select( student ){
        this.selectedStudent = student;
        this.form = {};
        angular.copy( this.selectedStudent, this.form );
        this.form.passwordConfirm = this.form.password;
    }

    modify(){
        if( !this.validate() ) return false;

        if( confirm("정보를 수정하시겠습니까?") ){
            this.StudentService.updateStudent(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
                    this.init();
                    return ;
                });
        }
    }

    delete(){

        if( confirm(this.selectedStudent.username + "학생계정을 삭제하시겠습니까?") ){
            this.StudentService.deleteStudent(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.form = {};
                    this.init();
                    return ;
                });
        }
    }

}
