function CustomTableController() {
  this.inputs = [
    {
      type: 'text',
      placeholder: 'Anything'
    },
    {
      type: 'email',
      placeholder: 'example@test.com'
    },
    {
      type: 'tel',
      placeholder: '0701234567'
    },
    {
      type: 'url',
      placeholder: 'http://www.exampleweb.ex'
    },
    {
      type: 'number',
      placeholder: '12345'
    },
    {
      type: 'password',
      placeholder: 'Anything'
    },
    {
      type: 'datetime-local',
      placeholder: '2019-01-01T09:30'
    },
    {
      type: 'month',
      placeholder: '2019-01'
    },
    {
      type: 'week',
      placeholder: '2019-W01'
    },
    {
      type: 'search',
      placeholder: 'Anything'
    }
  ];
}

angular.module('app').component('customTable', {
  controller: CustomTableController,
  templateUrl: 'table.html'
});
