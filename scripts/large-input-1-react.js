// ==UserScript==
// @name        Measure Time for Large Input (React.js - 5KB)
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

    if(localStorage.getItem('StartTime') != null) {
      var stopTime = localStorage.getItem('StopTime');
      var time = stopTime - startTime;
      localStorage.setItem('Time', time);

      times.push(time);
      localStorage.setItem('Times', JSON.stringify(times));
      console.log(times);
    }

    if(scriptsRun <= formsAmount) {
      inputTypes.forEach(function(type) {
        $('input[type=' + type + ']').each(function() {
          $(this).attr('value', setValue(type));
        });
      });

      $('#submit-form').click();
    }
    else if(scriptsRun > formsAmount) {
      var textFile = null;
      var data = [];

      for(let i = 0; i < formsAmount; i++) {
        if(simpleForm) data.push(inputType[i]);
        else data.push(formSize[i]);
        data.push(times[i]);
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

  $('#submit-form').on('click', function() {
    scriptsRun++;
    formIndex++;
    localStorage.setItem('ScriptsRun', scriptsRun);
    localStorage.setItem('FormIndex', formIndex);
  });

  function setValue(type) {
    switch(type) {
      case 'text':            return text();
      case 'email':           return email();
      case 'tel':             return tel();
      case 'url':             return url();
      case 'number':          return number();
      case 'password':        return password();
      case 'datetime-local':  return datetime();
      case 'month':           return month();
      case 'week':            return week();
      case 'search':          return search();
      default:                return 'reached default';
    }
  }

  function text() {
    return 'test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text ';
  }

  function email() {
    return 'exaaaaioekwgrijrioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawgrijrioegpaaaawoepjfpqwqwajrioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawgrijrioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawoepjfpqwaaioekwgrgrijr112321321312374524321ioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawgrijrioegpaaaawoepjfpqwaaioekwgrijrioeaaaawoepjfpqwaaioekwgrijrioegpaaaawoepjfpqwaaioekwgrgrijrioegpaaaa@woeprgriexaaaaioekwgrijrioegpaaaawoepjfpqwaaioekwgrijrioegpaaaawoepjfpqwaaiorgrijrioegpaaaaieklfmwheoidskleeeeedopwneuahdsjoivnbweuiaoieklfmwheoidedopnbweuiaoieklfmwheoidskleeeeedopwneuahdsjoivnbweuiaoieklfmwheoidedopwneuahdsjoivnbweuiaoieklfmwheoideest.com';
  }

  function tel() {
    return '55512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567555123456755512345675551234567';
  }

  function url() {
    return 'http://www.emfiowjepfkodsapojopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfiowdsapojopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfodsapojopwgmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfsapojopeopaldskvjiweojbemfiowjepfkodsapojopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfiowjepfkodsapojopeopaljopxamakeopkfwpejmfiowjepfkodsapojopwgeplewmfsapojopeopaldskvjiweojb.ex';
  }

  function number() {
    return '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';
  }

  function password() {
    return 'password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123password123';
  }

  function datetime() {
    return '2019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:302019-01-01T09:30';
  }

  function month() {
    return '2019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-012019-01';
  }

  function week() {
    return '2019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W012019-W01';
  }

  function search() {
    return 'search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string search string ';
  }
})();
