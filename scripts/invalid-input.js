// ==UserScript==
// @name     Measure Time for Invalid Input
// @version  1
// @grant    none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var run = 10;
var data = [];
var scriptsRun = localStorage.getItem('ScriptsRun');

if(localStorage.getItem('data') != null) data = JSON.parse(localStorage.getItem('data'));
if(scriptsRun == null) scriptsRun = 1;

$(document).ready(function() {
  if(scriptsRun <= run) {
    $('#email-input').attr('value', '<script type="text/javascript">alert("XSS");</script>');
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

$('#submit-form').on('click', function() {
  localStorage.setItem('StartTime', Date.now());

  $('#email-input').on('invalid', function() {
    localStorage.setItem('StopTime', Date.now());

    var startTime = localStorage.getItem('StartTime');
    var stopTime = localStorage.getItem('StopTime');
    var time = stopTime - startTime;
    localStorage.setItem('Time', time);

    data.push(time);
    localStorage.setItem('data', JSON.stringify(data));

    scriptsRun++;
    localStorage.setItem('ScriptsRun', scriptsRun);
    window.location.reload();
  });
});
