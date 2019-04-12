// ==UserScript==
// @name        Measure Time for Valid Input (React.js)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       localhost:3000/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
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
    if(scriptsRun == null) scriptsRun = 1;
    parseInt(scriptsRun);

    var formIndex = localStorage.getItem('FormIndex');
    if(formIndex == '' || formIndex == null) formIndex = 0;

    var times = [];
    var formSize = [];
    var inputType = [];

    $(document).ready(function() {
        if(localStorage.getItem('StartTime') != null) {
            if(localStorage.getItem('times') != null) times = JSON.parse(localStorage.getItem('times'));
            if(localStorage.getItem('FormSize') != null) formSize = JSON.parse(localStorage.getItem('FormSize'));

            var startTime = localStorage.getItem('StartTime');
            var stopTime = localStorage.getItem('StopTime');
            var time = stopTime - startTime;
            localStorage.setItem('Time', time);

            times.push(time);
            localStorage.setItem('times', JSON.stringify(times));
        } else {
            if(localStorage.getItem('times') != null) times = JSON.parse(localStorage.getItem('times'));
            if(localStorage.getItem('FormSize') != null) formSize = JSON.parse(localStorage.getItem('FormSize'));
            if(localStorage.getItem('InputType') != null) inputType = JSON.parse(localStorage.getItem('InputType'));
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
            var data = [];

            for(let i = 0; i < formsAmount; i++) {
                if(simpleForm) data.push(inputType[i]);
                else data.push(formSize[i]);
                data.push(times[i]);
            }

            data = data.toString();
            data = data.replace(/([\[\]])/g, '');
            data = data.replace(/([\d]{1,3}[\,])([\d]{1,3})([\,])/g, "$1$2\n");

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
})();
