import {createOffers} from './offer.js';

const mapCanvas = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const offerShow = createOffers();

const offerFragment = document.createDocumentFragment();

const renderFeatures = (container, data) => {
  container.innerHTML = '' //очистка контейнера с шаблонами
  data.forEach((item) => {
    const li = document.createElement('li'); // создание элемента
    li.classList.add(`feature-item--${item}`) // добавление классов
    container.appendChild(li) // добавление в контейнер элемента
    li.textContent = item;
  })
};

const renderPhotos = (container, data) => {
  container.innerHTML = ''; //очистка контейнера с шаблонами
  data.forEach((item) => {
    const img = document.createElement('img'); // создание элемента
    img.src = item;
    container.appendChild(img) // добавление в контейнер элемента

  })
};

offerShow.forEach((offers) => {
  const newOfferElement = offerTemplate.cloneNode(true);
  
  const featureContainer = newOfferElement.querySelector('.popup__features');
  const photosContainer = newOfferElement.querySelector('.popup__photos'); 


  newOfferElement.querySelector('.popup__title').textContent = offers.offer.title;
  newOfferElement.querySelector('.popup__text--address').textContent = offers.offer.address;
  newOfferElement.querySelector('.popup__text--price').textContent = offers.offer.price;
  newOfferElement.querySelector('.popup__type').textContent = offers.offer.type;
  newOfferElement.querySelector('.popup__text--capacity').textContent = offers.offer.rooms + ' комнаты для ' + offers.offer.guests + ' гостей.';
  newOfferElement.querySelector('.popup__text--time').textContent = ' Заезд после ' + offers.offer.checkin + ', выезд до ' + offers.offer.checkout;
  newOfferElement.querySelector('.popup__features').textContent = offers.offer.features;
  renderFeatures(featureContainer, offers.offer.features);
  renderPhotos(photosContainer, offers.offer.photos);
  newOfferElement.querySelector('.popup__avatar').src = offers.author.avatar;
  
  offerFragment.appendChild(newOfferElement);
});

export {offerShow};