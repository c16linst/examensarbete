var app = angular.module('app', []);

app.controller('controller', function() {

});

app.component('customForm', {
  controller: function($scope, INPUT_AMOUNT, INPUT_TYPE, INPUT_TYPES) {
    // Returns a matrix with a specified amount of forms that
    // contains different input types
    $scope.createFormsMatrix = function(amount) {
      var formsMatrix = [];

      for(let i = 0; i < amount; i++) {
        formsMatrix.push(INPUT_AMOUNT[i]);

        var inputs = [];
        for(let y = 0; y < INPUT_AMOUNT[i]; y++) {
          inputs[y] = INPUT_TYPE[y];
          formsMatrix[i] = inputs;

          INPUT_TYPE.shift();
        }
      }

      return formsMatrix;
    };

    // Create a new array of forms with inputs inside, based on the formsMatrix
    $scope.generateInputs = function(formsMatrix) {
      var forms = [];
      var formSize = [];
      var inputs = [];

      formsMatrix.forEach(function(form) {
        formSize.push(form.length);
        localStorage.setItem('formSize', JSON.stringify(formSize));

        form.forEach(function(type, index) {
          var inputObject = INPUT_TYPES[type-1];
          inputs.push(inputObject);
        });

        forms.push(inputs);
        inputs = [];
      });

      return forms;
    };

    $scope.renderForm = function() {
      // formsAmount is the only variable that should be changed!
      // It sets the amount of different forms that should exist
      const formsAmount = 5;
      localStorage.setItem('formsAmount', formsAmount);

      const formsMatrix = $scope.createFormsMatrix(formsAmount);
      const forms = $scope.generateInputs(formsMatrix);

      // formIndex will be set in the GreaseMonkey script
      var formIndex = localStorage.getItem('formIndex');
      if(formIndex == null || formIndex == '') formIndex = 0;

      return forms[formIndex];
    }

    $scope.dynamicForm = $scope.renderForm();
  },
  bindings: {
    ngModel: '='
  },
  templateUrl: 'form.html'
});

app.component('dateNumberInput', {
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '<'
  },
  templateUrl: 'dateNumberInput.html'
});

app.component('searchInput', {
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '<'
  },
  templateUrl: 'searchInput.html'
});

app.component('customInput', {
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '<'
  },
  templateUrl: 'input.html'
});

app.directive('dateNumberFormat', function() {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attr, $ngModelCtrl) {
      $ngModelCtrl.$formatters.length = 0;
      $ngModelCtrl.$parsers.length = 0;
    }
  };
});
