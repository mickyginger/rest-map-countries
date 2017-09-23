angular.module('customDirective')
  .directive('countryCard', countryCard);

function countryCard() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'js/views/countryCard.html',
    scope: {
      country: '='
    }
  };
}
