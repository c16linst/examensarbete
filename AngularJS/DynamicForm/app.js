var app = angular.module('app', []);

app.controller('controller', function($scope) {

})

// Helper function to update the scope's viewValue
function change(input, scope) {
  var form = scope.$parent.$parent.form;

  // Loop through all items in the form's scope to find the current input
  angular.forEach(form, function(element, name) {
    if(name == input.name) {
      element.$setViewValue(input.value);
      element.$validate();
    }
  })
}

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
        console.log('Failed to submit form');
        //location.reload(true);
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
        localStorage.setItem('FormSize', JSON.stringify(formSize));

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
      const formsAmount = 100;
      localStorage.setItem('FormsAmount', formsAmount);

      const formsMatrix = $scope.createFormsMatrix(formsAmount);
      const forms = $scope.generateInputs(formsMatrix);

      // formIndex will be set in the GreaseMonkey script
      var formIndex = localStorage.getItem('FormIndex');
      if(formIndex == null || formIndex == '') formIndex = 0;

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
