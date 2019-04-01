angular.module('app')
  .constant('INPUT_TYPES', [
    {
      type: 'text',
      name: 'text',
      placeholder: 'Anything'
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'example@test.com'
    },
    {
      type: 'tel',
      name: 'tel',
      placeholder: '0701234567'
    },
    {
      type: 'url',
      name: 'url',
      placeholder: 'http://www.exampleweb.ex'
    },
    {
      type: 'number',
      name: 'number',
      placeholder: '12345'
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Anything'
    },
    {
      type: 'datetime-local',
      name: 'date',
      placeholder: '2019-01-01T09:30'
    },
    {
      type: 'month',
      name: 'month',
      placeholder: '2019-01'
    },
    {
      type: 'week',
      name: 'week',
      placeholder: '2019-W01'
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Anything'
    }
  ]
);
