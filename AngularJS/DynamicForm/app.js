var app = angular.module('app', []);

app.controller('controller', function($scope) {

})

app.component('customForm', {
  controller: function($scope, $http, INPUT_AMOUNT, INPUT_TYPE, INPUT_TYPES) {
    $scope.scriptsRun = getScriptsRun();
    $scope.formIndex = getFormIndex();

    $scope.submit = function() {
      // Update localstorage for the GreaseMonkey script
      $scope.scriptsRun++;
      $scope.formIndex++;
      localStorage.setItem('ScriptsRun', $scope.scriptsRun);
      localStorage.setItem('FormIndex', $scope.formIndex);
      localStorage.setItem('StartTime', Date.now());

      // Manually post the form if it's valid
      if($scope.form.$invalid) {
        localStorage.setItem('StopTime', Date.now());
        console.log('Failed to submit form - form is invalid');
        location.reload(true);
        return;
      } else if($scope.form.$valid) {
        $http({
          method: 'post',
          url: 'index.html'
        })
        .then(function successCallback(res) {
          localStorage.setItem('StopTime', Date.now());
          location.reload(true);
        }, function errorCallback(res) {
          console.log('Failed to submit form');
        });
      }
    };

    // Returns a matrix with a specified amount of forms that
    // contains a "random" amount of inputs with "randomly" picked types
    $scope.createFormsMatrix = function(amount) {
      var formsMatrix = [];

      for(let i = 0; i < amount; i++) {
        var inputs = [];
        formsMatrix.push(INPUT_AMOUNT[i]);

        for(let y = 0; y < INPUT_AMOUNT[i]; y++) {
          inputs[y] = INPUT_TYPE[y];
          formsMatrix[i] = inputs;

          INPUT_TYPE.shift();
        }
      }

      return formsMatrix;
    };

    // Returns a matrix containing one input per form
    // The inputs will range over all types (1-10)
    $scope.createSimpleFormsMatrix = function(amount) {
      var formsMatrix = [];
      var index = 1;

      for(let i = 0; i < amount; i++) {
        formsMatrix.push(1);
        formsMatrix[i] = index;

        if(index < 10) index++;
        else index = 1;
      }

      return formsMatrix;
    };

    // Create a new array of forms with inputs inside, based on the formsMatrix
    $scope.generateInputs = function(formsMatrix) {
      var forms = [];
      var formSize = [];
      var types = [];
      var inputs = [];

      formsMatrix.forEach(function(form) {
        if(form.length > 0) {
          formSize.push(form.length);

          // FormSize will be used to evaluate if the form's
          // size makes a difference in the validation time
          localStorage.setItem('FormSize', JSON.stringify(formSize));

          form.forEach(function(type, index) {
            var inputObject = INPUT_TYPES[type-1];
            inputs.push(inputObject);
          });
        } else {
          var inputObject = INPUT_TYPES[form-1];
          inputs.push(inputObject);

          // InputType will be used to evaluate if the input's
          // type makes a difference in the validation time
          types.push(inputObject.type);
          localStorage.setItem('InputType', JSON.stringify(types));
        }

        forms.push(inputs);
        inputs = [];
      });

      return forms;
    };

    $scope.renderForm = function() {
      // !!!! formsAmount & simpleForm are the only
      //      variables that should be changed
      // -formsAmount: Sets the amount of different forms that should exist
      // -simpleForm: If true, the form will only contain one input at a time
      // and will loop through all input types
      const formsAmount = 100;
      const simpleForm = true;

      localStorage.setItem('FormsAmount', formsAmount);

      var formsMatrix;
      if(simpleForm) formsMatrix = $scope.createSimpleFormsMatrix(formsAmount);
      else formsMatrix = $scope.createFormsMatrix(formsAmount);

      const forms = $scope.generateInputs(formsMatrix);

      // formIndex will be set in the GreaseMonkey script
      var formIndex = localStorage.getItem('FormIndex');
      if(formIndex == null || formIndex == '') formIndex = 0;

      // Tell the GreasyMonkey script that this is a simple form
      if(simpleForm) localStorage.setItem('SimpleForm', true);

      return forms[formIndex];
    };

    $scope.dynamicForm = $scope.renderForm();
  },
  require: 'ngModel',
  bindings: {
    ngModel: '='
  },
  templateUrl: 'form.html'
})

// Helper function to update the scope's viewValue
function change(input, scope) {
  localStorage.setItem('StartSettingViewValue', Date.now());

  // Loop through all items in the form's scope to find the current input
  var form = scope.$parent.$parent.form;
  angular.forEach(form, function(element, name) {
    if(name == input.name) {
      element.$setViewValue(input.value);
      element.$validate();
      return; // Stop the loop if the correct input is found
    }
  })

  localStorage.setItem('StopSettingViewValue', Date.now());
}

// Helper functions to get values from localstorage
function getScriptsRun() {
  var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
  scriptsRun = (scriptsRun == null) ? 1 : scriptsRun;
  return scriptsRun;
}

function getFormIndex() {
  var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
  formIndex = (formIndex == null) ? 0 : formIndex;
  return formIndex;
}
