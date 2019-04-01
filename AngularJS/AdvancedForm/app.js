var app = angular.module('app', []);

app.controller('controller', function() {

});

app.component('customForm', {
  controller: function() {
    this.inputs = [
      {
        type: 'text',
        name: 'text',
        placeholder: 'Anything'
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'example@test.com'
      },
      {
        type: 'tel',
        name: 'tel',
        placeholder: '0701234567'
      },
      {
        type: 'url',
        name: 'url',
        placeholder: 'http://www.exampleweb.ex'
      },
      {
        type: 'number',
        name: 'number',
        placeholder: '12345'
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Anything'
      },
      {
        type: 'datetime-local',
        name: 'date',
        placeholder: '2019-01-01T09:30'
      },
      {
        type: 'month',
        name: 'month',
        placeholder: '2019-01'
      },
      {
        type: 'week',
        name: 'week',
        placeholder: '2019-W01'
      },
      {
        type: 'search',
        name: 'search',
        placeholder: 'Anything'
      }
    ];
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
