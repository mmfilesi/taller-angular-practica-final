(function(angular) {

  angular.module('app').component('counter', {
    templateUrl:  'app/components/game/counter/counter-template.html',
    controller: [counter],
    controllerAs: 'counter',
    /* Este componente recibe los parámetros desde el componente padre, los fallos
    y los aciertos. Si estos valores fueran "cadenas", pondríamos el símbolo de la @ y
    si fueran métodos, el =; como son ítems que apuntan al valor del c. padre y deben
    ser interpretados aquí, usamos el < */
    bindings: {
      ok: '<',
      ko: '<'
    }
  });

  function counter() {
    var vm = this;
  }

})(angular);
