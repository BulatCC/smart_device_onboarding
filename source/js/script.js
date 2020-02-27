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

  // поле номер телефона попапа
  var phoneNumberModal = modal.querySelector('#phone-callback');

  // поле номер телефона общик
  var phoneNumberQuestions = document.querySelector('#phone');

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
        localStorage.setItem('phone', phoneNumberModal.value);
        localStorage.setItem('message', textField.value);
      });
    }
  };

  // аккордеон
  var accordeon = function (title1, list1, title2, list2) {
    title1.addEventListener('click', function () {
      if (!title1.classList.contains('accordeon__toggle--active')) {
        title1.classList.add('accordeon__toggle--active');
        list1.classList.add('accordeon__list--active');
        if (title2.classList.contains('accordeon__toggle--active')) {
          title2.classList.remove('accordeon__toggle--active');
          list2.classList.remove('accordeon__list--active');
        }
      } else
      if (title1.classList.contains('accordeon__toggle--active')) {
        title1.classList.remove('accordeon__toggle--active');
        list1.classList.remove('accordeon__list--active');
      }
    });
  };

  accordeon(siteMapTitle, siteMapList, contactsTitle, contactsList);
  accordeon(contactsTitle, contactsList, siteMapTitle, siteMapList);

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
    window.iMaskJS(phoneNumberModal, {mask: '+{7}(000)000-00-00'});
  };

  window.iMaskJS(phoneNumberQuestions, {mask: '+{7}(000)000-00-00'});

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
