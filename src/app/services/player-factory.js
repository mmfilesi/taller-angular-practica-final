(function(angular) {

  angular.module('app').factory('playerFactory', ['$q', '$http', playerFactory]);

  function playerFactory($q, $http) {
    var module = {};
    var self = module;

    module.playerData = {
      name: '',
      email: '',
      avatar: 'unselected'
    };

    module.getPlayerData = function() {
      return self.playerData;
    };

    module.setPlayerData = function(data) {
      if ( data ) {
        self.playerData.name   = data.name ? data.name : '';
        self.playerData.email  = data.email ? data.email : '';
        self.playerData.avatar = data.avatar ? data.avatar : 'unselected';
      }
    };

    return module;
  };

})(angular);


