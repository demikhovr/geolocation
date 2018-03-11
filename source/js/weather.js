'use strict';

(function () {
  var btnWeather = document.querySelector('.btn--get-weather');
  var weatherOutput = document.querySelector('.weather__output');
  var template = document.querySelector('template').content;
  var weatherCardTemplate = template.querySelector('.weather-card');
  var cardElement = weatherCardTemplate.cloneNode(true);
  var weatherCity = cardElement.querySelector('.weather-city');
  var weatherPlace = cardElement.querySelector('.weather-place');
  var weatherTemperature = cardElement.querySelector('.weather-temperature span');
  var weatherDescription = cardElement.querySelector('.weather-descr');
  var weatherPic = cardElement.querySelector('.weather-pic img');
  var geolocationUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBpTX9FdZs4fLglcWPvPynL3S9KWdHHCPE';
  var weatherBaseUrl = 'https://api.apixu.com/v1/current.json?key=6acd666563c644979dd170248170205&q=';
  var coords;

  btnWeather.addEventListener('click', initCardWithGoogle);

  /**
   * Создаёт объект с координатами
   * @constructor
   */
  function Coordinates(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;
  }

  /**
   * Обработчик успешного получения координат
   * @param {Object} xhr
   */
  function successDataLoadHandler(xhr) {
    coords = new Coordinates(xhr.response.location.lat, xhr.response.location.lng);
    getWeather(coords);
  }

  /**
   * Обработчик неудачной попытки получения координат
   * @param {String} message
   */
  function errorDataLoadHandler(message) {
    console.log(message);
  }

  /**
   * Получение координат
   */
  function initCardWithGoogle(event) {
    event.preventDefault();

    window.backend.load(geolocationUrl, successDataLoadHandler, errorDataLoadHandler);
  }

  /**
   * Обработчик успешного получения данных о погоде
   * @param {Object} xhr
   */
  function successWeatherLoadHandler(xhr) {
    renderCard(xhr.response, insertCard);
  }

  /**
   * Обработчик неудачной попытки получения данных о погоде
   * @param {String} message
   */
  function errorWeatherLoadHandler(message) {
    console.log(message);
  }

  /**
   * Получение данных о погоде
   * @param {Object} coordinates
   */
  function getWeather(coordinates) {
    var weatherUrl = weatherBaseUrl + coordinates.latitude + ',' + coordinates.longitude;
    window.backend.load(weatherUrl, successWeatherLoadHandler, errorWeatherLoadHandler);
  }

  /**
   * Заполняет карту данными о местности и погоде
   * @param {Object} data
   */
  function renderCard(data, callback) {
    weatherCity.textContent = data.location.region;
    weatherPlace.textContent = data.location.name;
    weatherTemperature.textContent = data.current.temp_c;
    weatherDescription.textContent = data.current.condition.text;
    weatherPic.src = data.current.condition.icon;

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Вставляет карту в разметку
   */
  function insertCard() {
    weatherOutput.appendChild(cardElement);
  }
}());
