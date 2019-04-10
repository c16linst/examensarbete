var app = angular.module('app', []);

app.controller('controller', function() {

});

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

      // Check if the form is valid
      var form = $scope.form;
      var validities = [];
      var validity = true;

      // Loop through the forms scope...
      angular.forEach(form, function(element, name) {
        // ...and compare scope indexes to input names to find input scopes
        INPUT_TYPES.forEach(function(input) {
          // We should not do this for the other stuff in the scope
          if(name.indexOf(input.name) == 0) {
            validities.push(form[name].$valid);
          }
        });
      });

      validities.forEach(function(valid) {
        if(!valid) validity = false;
      });

      if(validity) {
        form.$valid = true;
        form.$invalid = false;
      } else {
        form.$valid = false;
        form.$invalid = true;
      }

      localStorage.setItem('ValidationStartTime', Date.now());

      // Manually post the form if it's valid
      if(form.$invalid) {
        console.log('Failed to submit form');
        return;
      } else if(form.$valid) {
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
    }

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
      const formsAmount = 3;
      localStorage.setItem('FormsAmount', formsAmount);

      const formsMatrix = $scope.createFormsMatrix(formsAmount);
      const forms = $scope.generateInputs(formsMatrix);

      // formIndex will be set in the GreaseMonkey script
      var formIndex = localStorage.getItem('FormIndex');
      if(formIndex == null || formIndex == '') formIndex = 0;

      return forms[formIndex];
    }

    $scope.dynamicForm = $scope.renderForm();
  },
  require: 'ngModel',
  bindings: {
    ngModel: '='
  },
  templateUrl: 'form.html'
});

app.component('textInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/textInput.html'
});

app.component('emailInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/emailInput.html'
});

app.component('telInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/telInput.html'
});

app.component('urlInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/urlInput.html'
});

app.component('numberInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/numberInput.html'
});

app.component('passwordInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/passwordInput.html'
});

app.component('dateInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/dateInput.html'
});

app.component('monthInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/monthInput.html'
});

app.component('weekInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/weekInput.html'
});

app.component('searchInput', {
  require: 'ngModel',
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<',
    ngModel: '='
  },
  templateUrl: 'input/searchInput.html'
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
