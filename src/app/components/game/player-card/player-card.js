(function(angular) {

  angular.module('app').component('playerCard', {
    templateUrl:  'app/components/game/player-card/player-card-template.html',
    controller: ['playerFactory', playerCard],
    controllerAs: 'playerCard'
  });

  function playerCard(playerFactory) {
    var vm = this;

    /* Para pasar datos entre componentes, en este caso los datos del jugador,
    se usan factorías a modo de almacén compartido. */
    vm.$onInit = function() {
      vm.playerData = playerFactory.getPlayerData();
    };

  }

})(angular);
