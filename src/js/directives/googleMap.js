/* global google */

angular.module('customDirective')
  .directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    template: '<div class="map"></div>',
    replace: true,
    scope: {
      center: '=',
      mapClick: '&'
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        center: { lat: 30, lng: 0 },
        zoom: 4
      });

      const geocoder = new google.maps.Geocoder();
      map.addListener('click', (e) => {
        geocoder.geocode({ latLng: e.latLng }, (results, status) => {
          if(status === 'ZERO_RESULTS') return false;
          const countryCode = results.reverse()[0].address_components[0].short_name;
          $scope.mapClick({ countryCode });
          $scope.$apply();
        });
      });

      const marker = new google.maps.Marker({
        map: map
      });

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
    }
  };
}
