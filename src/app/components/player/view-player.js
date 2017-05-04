(function(angular) {

  angular.module('app').component('viewPlayer', {
    templateUrl:  'app/components/player/view-player-template.html',
    controller: ['$state', 'playerFactory', viewPlayer],
    controllerAs: 'viewPlayer'
  });

  function viewPlayer($state, playerFactory) {
    var vm = this;

    vm.$onInit = function() {
      vm.allAvatar = [
        {id: 0, nick: 'garaydos', img: 'garaydos.png' },
        {id: 1, nick: 'lapras' , img: 'lapras.png' },
        {id: 2, nick: 'snorlax', img: 'snorlax.png' }
      ];
      vm.player         = {};
      vm.player.name    = '';
      vm.player.email   = '';
      vm.player.avatar  = 'unselected';
    };

    vm.actions = {};

    vm.actions.goToGame = function() {
      var playerData = {};

      playerData.name    = vm.player.name;
      playerData.email   = vm.player.email;
      playerData.avatar  = vm.player.avatar;

      playerFactory.setPlayerData(playerData);
      $state.go('game');
    };

  }

})(angular);
