(function(angular) {

  angular.module('app').component('viewAbout', {
    templateUrl:  'app/components/about/view-about-template.html',
    controller: ['$state', viewAbout],
    controllerAs: 'viewAbout'
  });

  function viewAbout($state) {
    var vm = this;

    vm.$onInit = function() {
    };

  }

})(angular);
