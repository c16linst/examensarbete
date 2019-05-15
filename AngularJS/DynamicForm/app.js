var app = angular.module('app', []);

app.controller('controller', function($scope) {

})

app.component('customForm', {
  controller: function($scope, $http, INPUT_AMOUNT, INPUT_TYPE, INPUT_TYPES) {
    $scope.scriptsRun = getFromLocalStorage('ScriptsRun');
    $scope.formIndex = getFromLocalStorage('FormIndex');

    $scope.submit = function() {
      // Update localstorage for the Tampermonkey script
      $scope.scriptsRun++;
      $scope.formIndex++;
      localStorage.setItem('ScriptsRun', $scope.scriptsRun);
      localStorage.setItem('FormIndex', $scope.formIndex);
      localStorage.setItem('StartTime', performance.now());

      // Manually post the form if it's valid
      if($scope.form.$invalid) {
        localStorage.setItem('StopTime', performance.now());
        console.log('The form was declined');
        localStorage.setItem('Submitted', 'false');
        location.reload(true);
        return;
      } else if($scope.form.$valid) {
        $http({
          method: 'post',
          url: 'index.html'
        })
        .then(function successCallback(res) {
          localStorage.setItem('StopTime', performance.now());
          console.log('The form was submitted');
          localStorage.setItem('Submitted', 'true');
          location.reload(true);
        }, function errorCallback(res) {
          console.log('An error occurred - the form was not submitted');
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

    $scope.generateRandomInputValue = function(type) {
      switch(type) {
        case 'text':
          return new RandExp(/.{1,30}/gi).gen();
        case 'email':
          return new RandExp(/([a-z\d._-]{1,20})\@([a-z]{1,15})\.([a-z]{2,6})/gi).gen();
        case 'tel':
          return new RandExp(/\+?([\d- ]{1,30})/g).gen();
        case 'url':
          return new RandExp(/(http|https)(:\/\/)(www\.)?([a-z\d-]{1,10})\.([a-z\d-.?%_]{1,40})/gi).gen();
        case 'number':
          return new RandExp(/\d{1,30}/g).gen();
        case 'password':
          return new RandExp(/.{1,30}/gi).gen();
        case 'datetime-local':
          return new RandExp(/([0-9]{4})-(0(1|[3-9])|1[1-2])-(0[1-9]|1[1-9]|2[1-9]|30)T([0-1][0-9]|2[0-3]):([0-5][0-9])/g).gen();
        case 'month':
          return new RandExp(/([1-9][0-9]{3})-(0[1-9]|1[0-2])/g).gen();
        case 'week':
          return new RandExp(/([0-9]{4})-W(0[1-9]|[1-4][1-9]|5[0-2])/g).gen();
        case 'search':
          return new RandExp(/.{1,50}/gi).gen();
        default:
          return 'reached default';
      }
    }

    // Create a new array of forms with inputs inside, based on the formsMatrix
    $scope.generateInputs = function(formsMatrix) {
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
        } else {
          var inputObject = INPUT_TYPES[form-1];
          inputs.push(inputObject);
          types.push(inputObject.type);
        }

        forms.push(inputs);
        inputs = [];
      });

      if($scope.scriptsRun == 1) {
        // Generate random values to insert into the inputs from the script
        var values = [];
        var validInput = localStorage.getItem('ValidInput');

        types.forEach(function(type) {
          if(validInput) values.push($scope.generateRandomInputValue(type));
          else values.push(new RandExp(/.{1,30}/gi).gen());
        });

        localStorage.setItem('Values', JSON.stringify(values));

        // InputType will be used to evaluate if the input's
        // type makes a difference in the validation time
        localStorage.setItem('InputType', JSON.stringify(types));

        // Add the formsMatrix to local storage if it's the first time the code
        // is executed, so it can be retrieved later on
        localStorage.setItem('FormsMatrix', JSON.stringify(forms));
      } else {
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
      const formsAmount = 100;
      const simpleForm = true;

      localStorage.setItem('FormsAmount', formsAmount);

      var formsMatrix;
      if(simpleForm) formsMatrix = $scope.createSimpleFormsMatrix(formsAmount);
      else formsMatrix = $scope.createFormsMatrix(formsAmount);

      const forms = $scope.generateInputs(formsMatrix);

      // formIndex will be set in the TamperMonkey script
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
  localStorage.setItem('StartSettingViewValue', performance.now());

  // Loop through all items in the form's scope to find the current input
  var form = scope.$parent.$parent.form;
  angular.forEach(form, function(element, name) {
    if(name == input.name) {
      element.$setViewValue(input.value);
      element.$validate();
      return; // Stop the loop if the correct input is found
    }
  })

  localStorage.setItem('StopSettingViewValue', performance.now());
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
