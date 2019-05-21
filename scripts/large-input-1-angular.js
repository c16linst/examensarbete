// ==UserScript==
// @name        Measure Time for Large Input (AngularJS)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       http://localhost/AngularJS/DynamicForm/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var $ = window.jQuery;

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

    var startTime = localStorage.getItem('StartTime');
    var formsAmount = localStorage.getItem('FormsAmount');
    var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
    var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
    var simpleForm = JSON.parse(localStorage.getItem('SimpleForm'));
    var times = JSON.parse(localStorage.getItem('Times'));
    var formSize = JSON.parse(localStorage.getItem('FormSize'));
    var inputType = JSON.parse(localStorage.getItem('InputType'));

    if(scriptsRun == null) scriptsRun = 1;
    if(formIndex == null) formIndex = 0;
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
        var inputs = document.querySelectorAll('.' + type);

        inputs.forEach(function(input) {
          $(input).focus();
          $(input).attr('ng-value', setValue(type));
          $(input).attr('value', setValue(type));
          $(input).val(setValue(type));
          $(input).blur();
          $(input).trigger('change');
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
