// ==UserScript==
// @name        Measure Time for Invalid Input (AngularJS)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       http://localhost/AngularJS/DynamicForm/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var $ = window.jQuery;

  localStorage.setItem('ValidInput', 'false');

  $(document).ready(function() {
    var inputIndex = localStorage.getItem('InputIndex');
    var startTime = localStorage.getItem('StartTime');
    var formsAmount = localStorage.getItem('FormsAmount');
    var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
    var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
    var simpleForm = JSON.parse(localStorage.getItem('SimpleForm'));
    var values = JSON.parse(localStorage.getItem('Values'));
    var times = JSON.parse(localStorage.getItem('Times'));
    var formSize = JSON.parse(localStorage.getItem('FormSize'));
    var inputType = JSON.parse(localStorage.getItem('InputType'));

    if(scriptsRun == null) scriptsRun = 1;
    if(formIndex == null) formIndex = 0;
    if(inputIndex == null) inputIndex = 0;
    if(times == null) times = [];
    if(formSize == null) formSize = [];
    if(inputType == null) inputType = [];

    // The total time can't be calculated unless there exists a start time
    if(startTime != null) {
      var stopTime = localStorage.getItem('StopTime');
      var time = stopTime - startTime;
      localStorage.setItem('Time', time);

      times.push(time);
      localStorage.setItem('Times', JSON.stringify(times));
    }

    // Experiment has not finished executing
    if(scriptsRun <= formsAmount) {
      var inputs = document.querySelectorAll('input');

      inputs.forEach(function(input) {
        // Don't do this for the submit button
        if(input.id != 'submit-form') {
          $(input).focus();
          $(input).attr('ng-value', values[inputIndex]);
          $(input).attr('value', values[inputIndex]);
          $(input).val(values[inputIndex]);
          $(input).blur();
          $(input).trigger('change');

          inputIndex++;
        }
      });

      localStorage.setItem('InputIndex', inputIndex);
      $('#submit-form').click();
    }
    // Experiment has finished executing
    else if(scriptsRun > formsAmount) {
      var textFile = null;
      var data = [];

      for(let i = 0; i < formsAmount; i++) {
        if(simpleForm) data.push(inputType[i]);
        else data.push(formSize[i]);
        data.push(times[i]);
      }

      // Format the data to fit in a spreadsheet
      data = data.toString();
      data = data.replace(/([\[\]])/g, '');
      if(simpleForm) data = data.replace(/([A-Za-z]*[\,])([\d\.]*)([\,])/g, "$1$2\n");
      else data = data.replace(/([\d\.]*)([\,])([\d\.]*)([\,])/g, "$1$2$3\n");

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
})();
