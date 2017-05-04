(function(angular) {

  /* 
  En esta factoría guardamos los datos relacionados con la baraja.
  En este tipo de aplicaciones, los datos siempre se recaban de back.
  Aquellos que no cambian, como este caso, son los masterdata */

  /* Inyectamos $q para poder usar promesas y $http para lanzar las llamadas ajax */
  angular.module('app').factory('cardsFactory', ['$q', '$http', cardsFactory]);

  function cardsFactory($q, $http) {
    var module = {};
    var self = module;

    /* Este tipo de funcionalidades generales, como desordenar un array,
    se suelen ubicar en una factoría denominada utils. Como solo hay esta función, la dejo aquí */
    function shufleDeck(deck) {
      var j, x, i;

      for (i =deck.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = deck[i - 1];
          deck[i - 1] = deck[j];
          deck[j] = x;
      }

      return deck;
    }

    /* Aquí guardaremos los datos de la baraja una vez que los carguemos por ajax */
    module.originalCards = false;

    /* Con este método o bien devolvemos la baraja si ya se ha cargado o bien una promesa, pues desde donde se pida siempre se van a recoger los datos con un then().
    Para preparar la baraja, la concatenamos a sí misma, de tal manera que haya pares y luego la desordenamos */

    module.getDeck = function() {
     // Declaramos la promesa 
      var defered = $q.defer();
      var promise = defered.promise;

      //  Si ya tenemos la baraja, las devolvemos 
      if ( self.originalCards ) {
        defered.resolve(self.prepareDeck());
      } else {
       // Si no, los cargamos con get y devolvemos el data del response
        $http.get('./app/mocks/cards.json').then(function(response) {
          // Seteamos originalCards para que la próxima vez no sea necesaria la llamada ajax
          self.originalCards = response.data;
          defered.resolve(self.prepareDeck());
        });
      }

      return promise;
    };

    module.prepareDeck = function() {
      /* concatenamos una copia profunda del array a sí mismo y lo desordenamos */
      var deckTemp = angular.copy(self.originalCards).concat(angular.copy(self.originalCards));

      return shufleDeck(deckTemp);
    };


    return module;
  };

})(angular);


