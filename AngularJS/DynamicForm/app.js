var app = angular.module('app', []);

app.controller('controller', function($scope) {

})

app.component('customForm', {
  controller: function($scope, $http, INPUT_AMOUNT, INPUT_TYPE, INPUT_TYPES, INPUT_VALUES, INPUT_VALUES_SIMPLE) {
    $scope.scriptsRun = getFromLocalStorage('ScriptsRun');
    $scope.formIndex = getFromLocalStorage('FormIndex');

    $scope.submit = function() {
      $scope.scriptsRun++;
      $scope.formIndex++;

      // Update localstorage for the Tampermonkey script
      localStorage.setItem('ScriptsRun', $scope.scriptsRun);
      localStorage.setItem('FormIndex', $scope.formIndex);
      localStorage.setItem('StartTime', performance.now());

      var submitted = JSON.parse(localStorage.getItem('Submitted'));
      if(submitted == null) submitted = [];

      // Manually post the form if it's valid
      if($scope.form.$invalid) {
        localStorage.setItem('StopTime', performance.now());

        submitted.push('false');
        localStorage.setItem('Submitted', JSON.stringify(submitted));

        console.log('The form was declined');
        location.reload(true);
        return;
      }
      else if($scope.form.$valid) {
        $http({
          method: 'post',
          url: 'index.html'
        })
        .then(function successCallback(res) {
          localStorage.setItem('StopTime', performance.now());

          submitted.push('true');
          localStorage.setItem('Submitted', JSON.stringify(submitted));

          console.log('The form was submitted');
          location.reload(true);
        },
          function errorCallback(res) {
            console.log('An error occurred - the form was not submitted');
          }
        );
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
    $scope.generateInputs = function(formsMatrix, simpleForm) {
      var forms = [];
      var formSize = [];
      var types = [];
      var inputs = [];
      var values = [];

      formsMatrix.forEach(function(form) {
        if(form.length > 0) {
          formSize.push(form.length);

          // FormSize will be used to evaluate if the form's
          // size makes a difference in the validation time
          localStorage.setItem('FormSize', JSON.stringify(formSize));

          form.forEach(function(type, index) {
            var inputObject = INPUT_TYPES[type-1];
            inputs.push(inputObject);
            types.push(inputObject.type);
          });
        }
        else {
          var inputObject = INPUT_TYPES[form-1];
          inputs.push(inputObject);
          types.push(inputObject.type);
        }

        forms.push(inputs);
        inputs = [];
      });

      if($scope.scriptsRun == 1) {
        // InputType will be used to evaluate if the input's
        // type makes a difference in the validation time
        localStorage.setItem('InputType', JSON.stringify(types));
        localStorage.setItem('FormsMatrix', JSON.stringify(forms));

        var validInput = JSON.parse(localStorage.getItem('ValidInput'));

        if(validInput == 'true') {
          if(simpleForm) localStorage.setItem('Values', JSON.stringify(INPUT_VALUES_SIMPLE));
          else localStorage.setItem('Values', JSON.stringify(INPUT_VALUES));
        }
        else {
          var values = [];

          for(var i = 0; i < 25000; i++) {
            values.push(new RandExp(/.{1,30}/gi).gen());
          }

          localStorage.setItem('Values', JSON.stringify(values));
        }
      }
      // If it's not the first the the app is launched, the forms should
      // be retrieved from local storage
      else {
        forms = JSON.parse(localStorage.getItem('FormsMatrix'));
      }

      return forms;
    };

    $scope.renderForm = function() {
      // !!!! formsAmount & simpleForm are the only
      //      variables that should be changed
      // -formsAmount: Sets the amount of different forms that should exist
      // -simpleForm: If true, the form will only contain one input at a time
      // and will loop through all input types
      const formsAmount = 1000;
      const simpleForm = false;

      if(simpleForm) localStorage.setItem('SimpleForm', true);
      localStorage.setItem('FormsAmount', formsAmount);

      // formIndex will be set in the Tampermonkey script
      var formIndex = localStorage.getItem('FormIndex');
      if(formIndex == null || formIndex == '') formIndex = 0;

      // Generate the forms
      var formsMatrix;
      if(simpleForm) formsMatrix = $scope.createSimpleFormsMatrix(formsAmount);
      else formsMatrix = $scope.createFormsMatrix(formsAmount);
      const forms = $scope.generateInputs(formsMatrix, simpleForm);

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
  var form = scope.$parent.$parent.form;

  // Loop through all items in the form's scope to find the current input
  angular.forEach(form, function(element, name) {
    if(name == input.name) {
      element.$setViewValue(input.value);
      element.$validate();
      return; // Stop the loop if the correct input is found
    }
  })
}

// Helper functions to get values from localstorage
function getFromLocalStorage(name) {
  var value = JSON.parse(localStorage.getItem(name));

  if(value == null) {
    if(name == 'ScriptsRun') value = 1;
    else value = 0;
  }

  return value;
}
