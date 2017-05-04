(function(angular) {

  angular.module('app').component('viewGame', {
    templateUrl:  'app/components/game/view-game-template.html',
    controller: ['$state', '$timeout', '$q', 'playerFactory', 'cardsFactory', viewGame],
    controllerAs: 'viewGame'
  });

  /* La lógica del juego es sencilla. Duplicamos las 8 cartas iniciales (en la factoría), de tal
  manera que cada carta tiene un type compartido. Es decir, una vez duplicado, en el
  array de la baraja habrá dos elementos como este:
    {"img": "card_00.jpg", "type": "a", "showCover": true }

  En una variable que inicializamos como 'unselected' vamos indicando cuál ha sido el último
  type seleccionado. Si es igual al que se selecciona en ese momento, eliminamos del array, de la baraja,
  todos los ítems con este type */
  function viewGame($state, $timeout, $q, playerFactory, cardsFactory) {
    var vm = this;

    vm.$onInit = function() {
      vm.results = {};
      /* El resto de valores iniciales los seteamos desde otra función para
      poder compartirla con el "jugar de nuevo" */
      vm.resetAllData();
    };

    /* Este método inicializa / resetea todos los datos y lo lanzamos
    al entrar en la pantalla, en el onInit, y al darle a jugar de nuevo */
    vm.resetAllData = function() {
      vm.lastCardSelected = 'unselected';
      vm.gameIsOver       = false;
      vm.results.ok       = 0;
      vm.results.ko       = 0;
      cardsFactory.getDeck().then(function(data) {
        vm.cards = data;
      });
    };

/* =======================================================================
  RENDERS
======================================================================= */

    vm.renders = {};

    /* Cuando las condiciones que determinan algo del renderizado de la template comienzan
    a ser muy complejas, conviene sacarlas de la vista para no recargarla con mucha lógica y
    llevárselas a una función de la template */
    vm.renders.checkCardPlayer = function() {
      var playerData = playerFactory.getPlayerData();

      if ( playerData.name || playerData.email || playerData.avatar !== 'unselected' ) {
        return true;
      }
      return false;
    };

/* =======================================================================
  ACTIONS
======================================================================= */

    vm.actions = {};

    vm.actions.selectCard = function(item) {
      var timer;

      item.showCover = false;

      /* El timeout en este caso cumple dos funciones, por un lado mantener descubierta un rato la carta,
      por otro, forzar el renderizado del componente. Los eventos asíncronos wrapeados en angular (timeout, interval y ajax)
      hacen que se renderize de nuevo */
      timer = $timeout(function() {
        item.showCover = true;
        vm.aux.checkSelected(item);
        /* Es recomendable "matar" los timeout una vez que han concluido */
        $timeout.cancel(timer);
      }, 1000);
    };

    vm.actions.playAgain = function() {
      /* No llamamos directamente a playAgain en la template por
      si tenemos que hacer algo más antes de resetear los datos */
      vm.resetAllData();
    };

/* =======================================================================
  AUX
======================================================================= */

    vm.aux = {};

    vm.aux.checkSelected = function(item) {
      if ( item.type === vm.lastCardSelected ) {
        vm.aux.removeCards(item.type);
        vm.lastCardSelected = 'unselected';
         vm.results.ok++;
      } else {
        vm.lastCardSelected = item.type;
         vm.results.ko++;
      }
      vm.aux.checkGameOver();
    };

    vm.aux.removeCards = function(type) {
      vm.cards = vm.cards.filter(function(item) {
        if ( item.type !== type ) {
          return true;
        }
      });
     };

    vm.aux.checkGameOver = function() {
      vm.gameIsOver = !vm.cards.length ? true : false;
    };

  }

})(angular);
