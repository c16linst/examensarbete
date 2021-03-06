// ==UserScript==
// @name        Measure Time for Invalid Input (React.js)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       localhost:3000/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var $ = window.jQuery;

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
  var simpleForm = JSON.parse(localStorage.getItem('SimpleForm'));
  var scriptsRun = localStorage.getItem('ScriptsRun');
  var formIndex = localStorage.getItem('FormIndex');

  if(formIndex == '' || formIndex == null) formIndex = 0;
  if(scriptsRun == null) scriptsRun = 1;
  parseInt(scriptsRun);

  $(document).ready(function() {
    var startTime = localStorage.getItem('StartTime');
    var times = JSON.parse(localStorage.getItem('Times'));
    var formSize = JSON.parse(localStorage.getItem('FormSize'));
    var inputType = JSON.parse(localStorage.getItem('InputType'));

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
      inputTypes.forEach(function(type) {
        $('input[type=' + type + ']').each(function() {
          $(this).attr('value', 'invalid input=!(@£∞@©≈$∞;2€!)');
        });
      });

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

  // Increase how many scripts have been executed
  // and which form is going to show
  $('#submit-form').on('click', function() {
    scriptsRun++;
    formIndex++;
    localStorage.setItem('ScriptsRun', scriptsRun);
    localStorage.setItem('FormIndex', formIndex);
  });
})();
