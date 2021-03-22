const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

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
  newOfferElement.querySelector('.popup__type').textContent = offer.type;
  newOfferElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
  newOfferElement.querySelector('.popup__text--time').textContent = ' Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  newOfferElement.querySelector('.popup__features').textContent = offer.features;
  renderFeatures(featureContainer, offer.features);
  renderPhotos(photosContainer, offer.photos);
  newOfferElement.querySelector('.popup__avatar').src = author.avatar;
  
  return newOfferElement;
});


export {offerShow}