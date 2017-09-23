angular.module('customDirective')
  .controller('Main', Main);

Main.inject = ['$http', '$anchorScoll', '$location'];
function Main($http, $anchorScroll, $location) {
  const vm = this;
  vm.countries = [];

  $http.get('https://restcountries.eu/rest/v2/all')
    .then(res => vm.countries = res.data);

  function selectCountry(country) {
    vm.selectedCountry = country;
    vm.mapCenter = { lat: country.latlng[0], lng: country.latlng[1] };
  }

  function selectCountryByCode(countryCode) {
    vm.selectedCountry = vm.countries.find(country => country.alpha2Code === countryCode);

    vm.mapCenter = { lat: vm.selectedCountry.latlng[0], lng: vm.selectedCountry.latlng[1] };

    $location.hash(countryCode);
    $anchorScroll();
  }

  vm.selectCountry = selectCountry;
  vm.selectCountryByCode = selectCountryByCode;
}
