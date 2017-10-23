class NgEnter{

    constructor(){
        this.restrict = "A";
    }

    link( scope, element, attrs ){
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    }
}

export default ( app ) => {
    app.directive("ngEnter" , () => new NgEnter );
};