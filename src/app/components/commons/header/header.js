(function(angular) {

  /* Es muy recomendable que nuestros custom elements tengan nombres compuestos,
  ya que así se diferencian mejor de los tags normales, que nunca son compuestos. */
  angular.module('app').component('mainHeader', {
    templateUrl:  'app/components/commons/header/header-template.html',
    controller: ['$state', mainHeader],
    controllerAs: 'mainHeader'
  });

  function mainHeader($state) {
    var vm = this;

    vm.$onInit = function() {
      vm.scale = false;
    };

    vm.goToMain = function() {
      $state.go('main');
    };
  }

})(angular);
