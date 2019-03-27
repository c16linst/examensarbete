function CustomInputController() {
  this.options = {
    updateOn: 'submit'
  };
}

angular.module('app').component('customInput', {
  bindings: {
    type: '<',
    name: '<',
    placeholder: '<'
  },
  controller: CustomInputController,
  templateUrl: 'input.html'
});
