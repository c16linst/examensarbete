// ==UserScript==
// @name        Benign Test Cases (AngularJS)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       http://localhost/AngularJS/DynamicForm/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var $ = window.jQuery;

  $(document).ready(function() {
    const inputTypes = [
      'text',
      'email',
      'tel',
      'url',
      'number',
      'password',
      'date',
      'month',
      'week',
      'search'
    ];

    var formsAmount = localStorage.getItem('FormsAmount');
    var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
    var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
    var inputType = JSON.parse(localStorage.getItem('InputType'));

    if(scriptsRun == null) scriptsRun = 1;
    if(formIndex == null) formIndex = 0;
    if(inputType == null) inputType = [];

    // Experiment has not finished executing
    if(scriptsRun <= formsAmount) {
      inputTypes.forEach(function(type) {
        var inputs = document.querySelectorAll('.' + type);

        inputs.forEach(function(input) {
          console.log('CURRENT INPUT TYPE: ' + type);

          $(input).focus();
          $(input).attr('ng-value', setValue(type));
          $(input).attr('value', setValue(type));
          $(input).val(setValue(type));
          $(input).blur();
          $(input).trigger('change');
        });
      });

      $('#submit-form').click();
    }
    // Experiment has finished executing
    else if(scriptsRun > formsAmount) {
        var textFile = null;
        var data = [];
        var submitted = JSON.parse(localStorage.getItem('Submitted'));

        for(let i = 0; i < formsAmount; i++) {
          data.push(inputType[i]);
          data.push(submitted[i]);
        }

        // Format the data to fit in a spreadsheet
        data = data.toString();
        data = data.replace(/([A-Za-z]*[-]?[A-Za-z]*[\,])([A-Za-z]*)([\,])/g, "$1$2\n");

        // Create file
        var createFile = function(input) {
          var blob = new Blob([input], { type: 'text/csv' });
          textFile = window.URL.createObjectURL(blob);
          return textFile;
        };

        // Download file
        var a = document.createElement('a');
        a.setAttribute('download', 'data.csv');
        a.setAttribute('href', createFile(data));
        document.body.appendChild(a);

        a.click();
    }
  });

  function setValue(type) {
    switch(type) {
      case 'text':
        return 'test text';
      case 'email':
        return 'example@test.com';
      case 'tel':
        return '5551234567';
      case 'url':
        return 'http://www.exampleweb.ex';
      case 'number':
        return '12345';
      case 'password':
        return 'password123';
      case 'date':
        return '2019-01-01T09:30';
      case 'month':
        return '2019-01';
      case 'week':
        return '2019-W01';
      case 'search':
        return 'search string';
      default:
        return 'reached default';
    }
  }
})();
