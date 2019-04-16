// ==UserScript==
// @name        Attack Test Cases (AngularJS)
// @namespace   http://tampermonkey.net/
// @version     0.1
// @grant       none
// @match       http://localhost/AngularJS/DynamicForm/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    var $ = window.jQuery;
    var attackString = "DROP sampletable;--";

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

        var inputType = [];
        var formsAmount = localStorage.getItem('FormsAmount');
        var scriptsRun = JSON.parse(localStorage.getItem('ScriptsRun'));
        var formIndex = JSON.parse(localStorage.getItem('FormIndex'));
        var simpleForm = JSON.parse(localStorage.getItem('SimpleForm'));

        if(scriptsRun == null) scriptsRun = 1;
        if(formIndex == null) formIndex = 0;

        if(localStorage.getItem('InputType') != null) inputType = JSON.parse(localStorage.getItem('InputType'));

        if(scriptsRun <= formsAmount) {
            inputTypes.forEach(function(type) {
                var inputs = document.querySelectorAll('.' + type);
                inputs.forEach(function(input) {
                    console.log('CURRENT INPUT TYPE: ' + type);
                    $(input).focus();
                    $(input).attr('ng-value', attackString);
                    $(input).attr('value', attackString);
                    $(input).val(attackString);
                    $(input).blur();
                    $(input).trigger('change');
                });
            });

            $('#submit-form').click();
        }
    });
})();
