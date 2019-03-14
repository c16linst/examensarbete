// ==UserScript==
// @name     Measure Time for Invalid Input (Advanced form)
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
  var inputIDs = [
    '#text',
    '#email',
    '#tel',
    '#url',
    '#number',
    '#password',
    '#date',
    '#month',
    '#week',
    '#search'
  ];

  if(scriptsRun <= run) {
    $.each(inputIDs, function(index, id) {
      fillInField(id, '<script type="text/javascript">alert("XSS");</script>');
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
  localStorage.setItem('StartTime', Date.now());

  $('#email').on('invalid', function() {
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
