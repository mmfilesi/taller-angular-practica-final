(function(angular) {

  angular.module('app').component('mainFooter', {
    templateUrl:  'app/components/commons/footer/footer-template.html',
    controller: ['$state', mainFooter],
    controllerAs: 'mainFooter'
  });

  function mainFooter($state) {
    var vm = this;

    vm.goToAbout = function() {
      $state.go('about');
    };
  }

})(angular);
