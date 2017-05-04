(function(angular) {

  /* Componente de la pantalla principal. En "controller" usamos un array para ir definiendo las dependencias
  (menos el último elemento que es la referencia a la función del controlador) */
  angular.module('app').component('viewMain', {
    templateUrl:  'app/components/main/view-main-template.html',
    controller: ['$state', viewMain],
    /* con controllerAs definimos un alias para referenciar este controlador en la template en lugar
    de la fórmula $ctrl... */
    controllerAs: 'viewMain'
  });

  /* Necesitamos el objeto $state del router para cambiar de pantalla */
  function viewMain($state) {
    var vm = this;

    /* Los controladores tienden a crecer, por lo que es recomendable agrupar los métodos en objetos,
    de tal manera que luego sea más fácil comprender de un vistazo qué hace cada cual. En mi caso,
    suelo usar estos objetos:
      actions, para los métodos que se lanzan desde eventos del usuario en la template
      rest, para llamadas a los modelos
      render, métodos relacionados con la renderización de los elementos
      aux, métodos auxiliares.
    Hay un ejemplo más completo en view-game
    */

    vm.actions = {};

    /* En lugar de utilizar state.go, se pueden colocar directamente los enlaces en la template
    con la directiva ui-sref */
    vm.actions.goToPlayer = function() {
      $state.go('player');
    };

  }



})(angular);
