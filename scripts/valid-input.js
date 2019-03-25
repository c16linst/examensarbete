// ==UserScript==
// @name     Measure Time for Valid Input
// @version  1
// @grant    none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

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

var formsAmount = localStorage.getItem('formsAmount');

var scriptsRun = localStorage.getItem('ScriptsRun');
if(scriptsRun == null) scriptsRun = 1;

var formIndex = localStorage.getItem('formIndex');
if(formIndex == '' || formIndex == null) formIndex = 0;

var data = [];

$(document).ready(function() {
  if(localStorage.getItem('StartTime') != null) {
    if(localStorage.getItem('data') != null) data = JSON.parse(localStorage.getItem('data'));

    var startTime = localStorage.getItem('StartTime');
    var stopTime = localStorage.getItem('StopTime');
    var time = stopTime - startTime;
    localStorage.setItem('Time', time);

    data.push(time);
    localStorage.setItem('data', JSON.stringify(data));
  } else {
    if(localStorage.getItem('data') != null) data = JSON.parse(localStorage.getItem('data'));
  }

  if(scriptsRun <= formsAmount) {
    inputTypes.forEach(function(type) {
      $('input[type=' + type + ']').each(function() {
        $(this).attr('value', setValue(type));
      });
    });

    $('#submit-form').click();
  } else if(scriptsRun > formsAmount) {
    var textFile = null;

    data = data.toString();
    data = data.replace(/([\[\]])/g, '');
    data = data.replace(/(\,)/g, '\n');

    var createFile = function(input) {
      var blob = new Blob([input], { type: 'text/plain' });
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
  localStorage.setItem('StartTime', Date.now());
  localStorage.setItem('ScriptsRun', scriptsRun);
  localStorage.setItem('formIndex', formIndex);
});

function setValue(type) {
  switch(type) {
    case 'text':
      return 'test text';
    case 'email':
      return 'example@test.com';
    case 'tel':
      return '0701234567';
    case 'url':
      return 'http://www.exampleweb.ex';
    case 'number':
      return '12345';
    case 'password':
      return 'password123';
    case 'datetime-local':
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
