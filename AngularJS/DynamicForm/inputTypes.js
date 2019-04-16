angular.module('app')
  .constant('INPUT_TYPES', [
    {
      type: 'text',
      name: 'text',
      label: 'Text',
      placeholder: 'Anything'
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'example@test.com'
    },
    {
      type: 'tel',
      name: 'tel',
      label: 'Phone',
      placeholder: '5551234567'
    },
    {
      type: 'url',
      name: 'url',
      label: 'URL',
      placeholder: 'http://www.exampleweb.ex'
    },
    {
      type: 'number',
      name: 'number',
      label: 'Number',
      placeholder: '12345'
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Anything'
    },
    {
      type: 'datetime-local',
      name: 'date',
      label: 'Date',
      placeholder: '2019-01-01T09:30'
    },
    {
      type: 'month',
      name: 'month',
      label: 'Month',
      placeholder: '2019-01'
    },
    {
      type: 'week',
      name: 'week',
      label: 'Week',
      placeholder: '2019-W01'
    },
    {
      type: 'search',
      name: 'search',
      label: 'Search',
      placeholder: 'Anything'
    }
  ]
);
