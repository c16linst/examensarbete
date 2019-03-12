// ==UserScript==
// @name     Measure Time for Valid Input (Advanced form)
// @version  1
// @grant    none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var run = 10;
var scriptsRun = localStorage.getItem('ScriptsRun');
if(scriptsRun == null) scriptsRun = 1;

$(document).ready(function() {
  var data = [];
  if(localStorage.getItem('data') != null) data = JSON.parse(localStorage.getItem('data'));

  if(localStorage.getItem('StartTime') != null) {
    localStorage.setItem('StopTime', Date.now());

    var startTime = localStorage.getItem('StartTime');
    var stopTime = localStorage.getItem('StopTime');
    var time = stopTime - startTime;
    localStorage.setItem('Time', time);

    data.push(time);
    localStorage.setItem('data', JSON.stringify(data));
  }

  var inputValues = {
    '#text': 'Test text',
    '#email': 'example@test.com',
    '#tel': '0701234567',
    '#url': 'http://www.example.test',
    '#number': '12345',
    '#password': 'password',
    '#date': '2019-01-01T09:30',
    '#month': '2019-01',
    '#week': '2019-W01',
    '#search': 'Test search'
  };

  if(scriptsRun <= run) {
    $.each(inputValues, function(id, value) {
      fillInField(id, value);
    });

    $('#submit-form').click();
  } else if(scriptsRun > run) {
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

function fillInField(id, text) {
  $(id).focus();
  $(id).attr('value', text);
  $(id).blur();
}

$('#submit-form').on('click', function() {
  scriptsRun++;
  localStorage.setItem('StartTime', Date.now());
  localStorage.setItem('ScriptsRun', scriptsRun);
});
