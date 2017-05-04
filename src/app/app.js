'use strict';

/* Es recomendable salvaguardar cada parte del código en el marco
de una función autoejecutable */
(function(angular) {

  /* Al core de angular le vamos añadiendo paquetes extra que vayamos
  necesitando, como el router */
  var extraModules = ['ui.router', 'ngAnimate'];

  /* Módulo principal de la aplicación, debe llamarse igual que el nombre
  indicado en la directiva ng-app que hemos incluido en el index.html.
  En este caso, app. Como segundo parámetro, el array de "paquetes extra"
  que vamos a añadir al core básico. */
  angular.module('app', extraModules);

})(angular);
 