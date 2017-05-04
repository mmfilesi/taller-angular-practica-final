'use strict';

(function(angular) {

  /* Una aplicación angular pasa por dos grandes fases: de arranque, donde podemos configurar cosas mediante
  el método config() y de ejecución, donde usaremos run(). En la fase config, definimos el ruteado */
  angular.module('app').config(['$stateProvider', '$urlRouterProvider', appConfig]);

  /* Para el router, necesitamos usar los objetos $stateProvider, $urlRouterProvider, que inyectamos arriba y en la función correspondiente */
  function appConfig($stateProvider, $urlRouterProvider) {   

    /* Definimos tantos "estados" como pantallas principales vaya a tener la single page application.
    Por lo menos, indicaremos tres parámetros:
    name: el nombre del estado
    url: la url que se verá en la barra de navegación
    template: el html que se renderizará cuando estemos en ese estado - url. Como estamos trabajando
    orientado a componentes, indicamos el componente principal de cada pantalla.
    El html indicado aquí es el que se renderizará en el tag <ui-view> que hemos puesto en el index.
    */

    /* Creamos un objeto con las pantallas... */
    var allStates = {};

    allStates.main = {
      name: 'main',
      url: '/main',
      template: '<view-main></view-main>'
    };

    allStates.player = {
      name: 'player',
      url: '/player/',
      template: '<view-player></view-player>'
    };

    allStates.about = {
      name:'about',
      url: '/about',
      template: '<view-about></view-about>'
    };

    allStates.game = {
      name:'game',
      url: '/game',
      template: '<view-game></view-game>'
    };

    /* Y lo recorremos con un for in para pasar cada estado al método state de $stateProvider */
    for (var key in allStates) {
      if (allStates.hasOwnProperty(key)) {
        $stateProvider.state(allStates[key]);
      }
    }

    /* Terminamos la configuración indicando cuál será la ruta por defecto, la que se cargará si no
    se ha indicado ninguna válida, con el método otherwise() del $urlRouterProvider */
    $urlRouterProvider.otherwise('/main');
  }

})(angular);
