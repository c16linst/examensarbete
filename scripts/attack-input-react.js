// ==UserScript==
// @name        Attack Test Cases (React.js)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       localhost:3000/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var $ = window.jQuery;
  var attackString = "DROP sampletable;--";

  const inputTypes = [
    'text',
    'email',
    'tel',
    'url',
    'number',
    'password',
    'datetime-local',
    'month',
    'week',
    'search'
  ];

  var formsAmount = parseInt(localStorage.getItem('FormsAmount'));
  parseInt(formsAmount);

  var scriptsRun = localStorage.getItem('ScriptsRun');
  if(scriptsRun == null) scriptsRun = 1;
  parseInt(scriptsRun);

  var formIndex = localStorage.getItem('FormIndex');
  if(formIndex == '' || formIndex == null) formIndex = 0;

  var inputType = [];

  $(document).ready(function() {
    if(localStorage.getItem('InputType') != null) inputType = JSON.parse(localStorage.getItem('InputType'));

    if(scriptsRun <= formsAmount) {
      inputTypes.forEach(function(type) {
        $('input[type=' + type + ']').each(function() {
          console.log('CURRENT INPUT TYPE: ' + type);
          $(this).attr('value', attackString);
        });
      });

      $('#submit-form').click();
    } else if(scriptsRun > formsAmount) {
      var textFile = null;
      var data = [];
      var submitted = JSON.parse(localStorage.getItem('Submitted'));

      for(let i = 0; i < formsAmount; i++) {
        data.push(inputType[i]);
        data.push(submitted[i]);
      }

      data = data.toString();
      data = data.replace(/([A-Za-z]*[-]?[A-Za-z]*[\,])([A-Za-z]*)([\,])/g, "$1$2\n");

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

  $('#submit-form').on('click', function() {
    scriptsRun++;
    formIndex++;
    localStorage.setItem('ScriptsRun', scriptsRun);
    localStorage.setItem('FormIndex', formIndex);
  });
})();
