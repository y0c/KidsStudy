export default class StudentController{
    /** @ngInject */
    constructor($scope, StudentService, $filter){
        this.$scope         = $scope;
        this.StudentService = StudentService;
        this.$filter        = $filter;
        this.selectStudent  = null;
        this.searchQuery    = "";
        this.setGridOptions();
        // this.gridApi.grid.refresh();
        this.init();
        console.log(this.gridApi);
    }

    setGridOptions(){
        let vm = this;
        this.gridOptions = {
            enableSorting : true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs : [
                { name : "학생아이디", field : "userId" },
                { name : "학생이름", field : "userName"},
                { name : "학년", field : "grade"},
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

    filter(){
        this.gridOptions.data = this.$filter('filter')( this.students, this.searchQuery);
    }


    init(){
        this.StudentService.selectStudentList({})
            .then(( result ) => {
                this.students = result.studentList;
                this.gridOptions.data = result.studentList;
            });
    }

    reset(){
        this.form = {};
        this.selectedStudent = null;
    }

    validate(){
        let messageMap = {
            "userId" : "학생아이디를 입력해주세요",
            "userName" : "학생이름을 입력해주세요",
            "password" : "비밀번호를 입력해주세요",
            "passwordConfirm" :  "비밀번호 확인을 입력해주세요",
            "grade" : "학년을 입력해주세요"
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
                    this.reset();
                    this.init();
                    return ;
                });
        }

    }


    select( student ){
        this.StudentService.selectStudentOne({
            userId : student.userId
        }).then( result => {
            this.selectedStudent = result.student;
            this.paperGroupList = result.paperGroupList;
            this.form = {};
            angular.copy( this.selectedStudent, this.form );
            this.form.passwordConfirm = this.form.password;
        });
    }

    modify(){
        if( !this.validate() ) return false;

        if( confirm("정보를 수정하시겠습니까?") ){
            this.StudentService.updateStudent(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }
    }

    delete(){

        if( confirm( `${this.selectedStudent.userName} 학생계정을 삭제하시겠습니까?`) ){
            this.StudentService.deleteStudent(this.form)
                .then( ( result ) => {
                    alert(result.message);
                    this.reset();
                    this.init();
                    return ;
                });
        }
    }

}
