// ==UserScript==
// @name        Attack Test Cases (AngularJS)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       http://localhost/AngularJS/DynamicForm/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var $ = window.jQuery;
  var attackString = "DROP sampletable;--";

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

    var inputType = [];
    var formsAmount = localStorage.getItem('FormsAmount');
    var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
    var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
    var simpleForm = JSON.parse(localStorage.getItem('SimpleForm'));

    if(scriptsRun == null) scriptsRun = 1;
    if(formIndex == null) formIndex = 0;

    if(localStorage.getItem('InputType') != null) inputType = JSON.parse(localStorage.getItem('InputType'));

    if(scriptsRun <= formsAmount) {
      inputTypes.forEach(function(type) {
        var inputs = document.querySelectorAll('.' + type);
        inputs.forEach(function(input) {
          console.log('CURRENT INPUT TYPE: ' + type);
          $(input).focus();
          $(input).attr('ng-value', attackString);
          $(input).attr('value', attackString);
          $(input).val(attackString);
          $(input).blur();
          $(input).trigger('change');
        });
      });

      $('#submit-form').click();
    } else if(scriptsRun > formsAmount) {
      var textFile = null;
      var data = [];

      for(let i = 0; i < formsAmount; i++) {
        data.push(inputType[i]);
        data.push(localStorage.getItem('Submitted'));
      }

      data = data.toString();
      data = data.replace(/([\[\]])/g, '');
      if(simpleForm) data = data.replace(/([A-Za-z]*[\,])([\d\.]*)([\,])/g, "$1$2\n");
      else data = data.replace(/([\d\.]*)([\,])([\d\.]*)([\,])/g, "$1$2$3\n");

      var createFile = function(input) {
        var blob = new Blob([input], { type: 'text/csv' });
        textFile = window.URL.createObjectURL(blob);
        return textFile;
      };

      var a = document.createElement('a');
      a.setAttribute('download', 'data.csv');
      a.setAttribute('href', createFile(data));
      document.body.appendChild(a);

      a.click();
    }
  });
})();
