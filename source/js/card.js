import {getOfferType} from './utils.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const isElementVisible = (element, components) => {
  if (components.length === 0) {
    element.setAttribute('style', 'visibility: hidden;');
    return false;
  }
  element.setAttribute('style', 'visibility: visible;');
  return true;
};

const renderFeatures = (featuresElement, offer) => {
  if (!isElementVisible(featuresElement, offer.features)) {
    return;
  }

  featuresElement.innerHTML = offer.features.map((feature) => {
    return `<li class="popup__feature popup__feature--${feature}"></li>`;
  }).join('');
};

const renderPhotos = (container, data) => {
  container.innerHTML = ''; //очистка контейнера с шаблонами
  data.forEach((item) => {
    const img = document.createElement('img'); // создание элемента
    img.src = item;
    img.width = 45;
    img.height = 40;
    container.appendChild(img) // добавление в контейнер элемента
    
  })
};


const offerShow = (({author, offer}) => {
  const newOfferElement = offerTemplate.cloneNode(true);
    
  const featureContainer = newOfferElement.querySelector('.popup__features');
  const photosContainer = newOfferElement.querySelector('.popup__photos'); 

  newOfferElement.querySelector('.popup__title').textContent = offer.title;
  newOfferElement.querySelector('.popup__text--address').textContent = offer.address;
  newOfferElement.querySelector('.popup__text--price').textContent = offer.price;
  newOfferElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
  newOfferElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
  newOfferElement.querySelector('.popup__text--time').textContent = ' Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  renderFeatures(featureContainer, offer);
  renderPhotos(photosContainer, offer.photos);
  newOfferElement.querySelector('.popup__avatar').src = author.avatar;
  
  return newOfferElement;
});


export {offerShow}