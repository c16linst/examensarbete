// ==UserScript==
// @name        Measure Time for Invalid Input (AnuglarJS)
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

        var times = [];
        var formSize = [];
        var inputType = [];
        var startTime = localStorage.getItem('StartTime');
        var formsAmount = localStorage.getItem('FormsAmount');
        var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
        var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
        var simpleForm = JSON.parse(localStorage.getItem('SimpleForm'));
        var manualStart = localStorage.getItem('StartSettingViewValue');
        var manualStop = localStorage.getItem('StopSettingViewValue');
        var manualTime = manualStop - manualStart;

        if(scriptsRun == null) scriptsRun = 1;
        if(formIndex == null) formIndex = 0;

        if(startTime != null) {
            if(localStorage.getItem('Times') != null) times = JSON.parse(localStorage.getItem('Times'));
            if(localStorage.getItem('FormSize') != null) formSize = JSON.parse(localStorage.getItem('FormSize'));
            if(localStorage.getItem('InputType') != null) inputType = JSON.parse(localStorage.getItem('InputType'));

            var stopTime = localStorage.getItem('StopTime');
            var time = (stopTime - startTime) - manualTime;
            localStorage.setItem('Time', time);

            times.push(time);
            localStorage.setItem('Times', JSON.stringify(times));
        } else {
            if(localStorage.getItem('Times') != null) times = JSON.parse(localStorage.getItem('Times'));
            if(localStorage.getItem('FormSize') != null) formSize = JSON.parse(localStorage.getItem('FormSize'));
            if(localStorage.getItem('InputType') != null) inputType = JSON.parse(localStorage.getItem('InputType'));
        }

        if(scriptsRun <= formsAmount) {
            inputTypes.forEach(function(type) {
                var inputs = document.querySelectorAll('.' + type);
                inputs.forEach(function(input) {
                    $(input).focus();
                    $(input).attr('ng-value', 'invalid input=!(@£∞@©≈$∞;2€!)');
                    $(input).attr('value', 'invalid input=!(@£∞@©≈$∞;2€!)');
                    $(input).val('invalid input=!(@£∞@©≈$∞;2€!)');
                    $(input).blur();
                    $(input).trigger('change');
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
})();
