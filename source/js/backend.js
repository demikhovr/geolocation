'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 100000; // мс
  var Statuses = {
    '200': 'OK',
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '403': 'Доступ запрещен',
    '404': 'Ничего не найдено',
    '405': 'Внутренняя ошибка сервера'
  };

  /**
   * Создаёт и возвращает объект XMLHttpRequest
   * @param {Function} onLoad
   * @param {Function} onError
   * @return {Object} xhr
   */
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr);
      } else {
        onError(Statuses[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Statuses[xhr.status]);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  /**
   * Функция, загружающая данные по сети
   * @param {String} url - адрес
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var load = function (url, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', url);
    xhr.send();
  };

  window.backend = {
    load: load
  };
}());
