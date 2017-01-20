describe('Controller: MathController', function () {

  // load the controller's module
    beforeEach(module('confusionApp'));
    var MathController, scope;

    beforeEach(inject(function ($controller, $rootScope) {
       scope = $rootScope.$new();
       MathController = $controller('MathController', {
         $scope: scope
       });
    }));

    it(' should be able to multiply two positive number', function (){
        expect(scope.multiply(3,5)).toEqual(15);
    });

    it(' should be able to multiply positive and nagetive number', function (){
        expect(scope.multiply(3,-5)).toEqual(-15);
    });

    it(' should be able to multiply tow  nagetive number', function (){
        expect(scope.multiply(-3,-5)).toEqual(15);
    });

    it('should be able to multiply by 0', function (){
        expect(scope.multiply(-3,0)).toEqual(-0);
    });

  });
