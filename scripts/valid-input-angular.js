// ==UserScript==
// @name        Measure Time for Valid Input (AngularJS)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       http://localhost/AngularJS/DynamicForm/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
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

        var times = [];
        var formSize = [];
        var startTime = localStorage.getItem('StartTime');
        var formsAmount = localStorage.getItem('FormsAmount');
        var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
        var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
        var manualStart = localStorage.getItem('StartSettingViewValue');
        var manualStop = localStorage.getItem('StopSettingViewValue');
        var manualTime = manualStop - manualStart;

        if(scriptsRun == null) scriptsRun = 1;
        if(formIndex == null) formIndex = 0;

        if(startTime != null) {
            if(localStorage.getItem('Times') != null) times = JSON.parse(localStorage.getItem('Times'));
            if(localStorage.getItem('FormSize') != null) formSize = JSON.parse(localStorage.getItem('FormSize'));

            var stopTime = localStorage.getItem('StopTime');
            var time = (stopTime - startTime) - manualTime;
            localStorage.setItem('Time', time);

            times.push(time);
            localStorage.setItem('Times', JSON.stringify(times));
        } else {
            if(localStorage.getItem('Times') != null) times = JSON.parse(localStorage.getItem('Times'));
            if(localStorage.getItem('FormSize') != null) formSize = JSON.parse(localStorage.getItem('FormSize'));
        }

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
        } else if(scriptsRun > formsAmount) {
            var textFile = null;
            var data = [];

            for(let i = 0; i < formsAmount; i++) {
                data.push(formSize[i]);
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

    function setValue(type) {
        switch(type) {
            case 'text':
                return 'test text';
            case 'email':
                return 'example@test.com';
            case 'tel':
                return '5551234567';
            case 'url':
                return 'http://www.exampleweb.ex';
            case 'number':
                return '12345';
            case 'password':
                return 'password123';
            case 'date':
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
