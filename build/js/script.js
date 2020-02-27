'use strict';
(function () {
  // тэг body
  var bodyTag = document.querySelector('body');

  // кнопка 'заказать звонок'
  var callButton = document.querySelector('.page-header__contacts-button');

  // модальное окно
  var modal = document.querySelector('.modal');

  // кнопка закрытия модального окна
  var modalCloseButton = document.querySelector('.modal-button');

  // заголовок "разделы сайта"
  var siteMapTitle = document.querySelector('.nav__title');

  // список разделов сайта
  var siteMapList = document.querySelector('.nav__list');

  // заголовок раздела "Контакты"
  var contactsTitle = document.querySelector('.contacts__title');

  // список разделов сайта
  var contactsList = document.querySelector('.contacts__list');

  // поле имя
  var userName = modal.querySelector('#name-callback');

  // поле номер телефона
  var phoneNumber = modal.querySelector('#phone-callback');

  // текстовое поле
  var textField = modal.querySelector('#ask-question-callback');

  // форма
  var form = modal.querySelector('.modal__form');

  // флаг для проверки работы localstorage
  var isLocalStorageEnabled = true;

  // проверка на работоспособность localstorage
  try {
    localStorage.getItem('name');
  } catch (err) {
    isLocalStorageEnabled = false;
  }

  // сохраняет данные в localstorage
  var saveData = function () {
    if (isLocalStorageEnabled) {
      form.addEventListener('submit', function () {
        localStorage.setItem('name', userName.value);
        localStorage.setItem('phone', phoneNumber.value);
        localStorage.setItem('message', textField.value);
      });
    }
  };

  // аккордеон
  siteMapTitle.addEventListener('click', function () {
    siteMapTitle.classList.toggle('accordeon__toggle--active');
    siteMapList.classList.toggle('accordeon__list--active');
  });

  contactsTitle.addEventListener('click', function () {
    contactsTitle.classList.toggle('accordeon__toggle--active');
    contactsList.classList.toggle('accordeon__list--active');
  });

  // закрывает попап
  var removeModal = function () {
    modal.classList.remove('modal--active');
    bodyTag.classList.remove('disable-scroll');
  };

  // закрывает попап
  var closeModal = function () {
    modalCloseButton.addEventListener('click', function () {
      removeModal();
    });

    modal.addEventListener('click', function (evt) {
      if (evt.target === modal) {
        removeModal();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        removeModal();
      }
    });
  };

  // валидация по номеру телефона
  var validation = function () {
    window.iMaskJS(phoneNumber, {mask: '+{7}(000)000-00-00'});
  };

  // запускает работу с модальным окном
  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--active');
    bodyTag.classList.add('disable-scroll');
    userName.focus();
    closeModal();
    saveData();
    validation();
  });

})();
