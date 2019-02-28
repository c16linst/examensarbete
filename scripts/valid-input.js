// ==UserScript==
// @name     Measure Time for Valid Input
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

	if(scriptsRun <= run) {
    $('#email-input').focus();
    $('#email-input').attr('value', 'test@example.com');
    $('#email-input').blur();
    $('#submit-form').click();
  }
});

$('#submit-form').on('click', function() {
  scriptsRun++;
  localStorage.setItem('StartTime', Date.now());
	localStorage.setItem('ScriptsRun', scriptsRun);
});
