class focus {

    constructor(){
        this.restrict = 'A';
    }
    /** @ngInject */
    link( scope, eleme, attrs){
        scope.$on('focusOn', function(e, name) {
            if(name === attr.focusOn) {
              elem[0].focus();
            }
        });
    }
}

export { focus as default }
