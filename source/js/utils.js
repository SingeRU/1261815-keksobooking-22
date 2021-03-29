const ALERT_SHOW_TIME = 5000;

const getRandomNumber = function (from, to, signsQuantity) {
  if(from > to || from == to) {
    throw new Error('Значение "от" не может быть больше или равнятся значению "до"!');
  }
    
  if (from < 0 || to < 0 ) {
    throw new Error('Значения не могут быть меньше нуля!');
  }
    
  let rand = from + Math.random() * (to - from);
  return rand.toFixed(signsQuantity);
    
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
}

const getOfferType = (type) => {
  const offers = {
    flat: 'Квартрира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  }
  return offers[type];
};

const showError = (message='Не удалось загрузить данные') => {
  return () => {
    const alertContainer = document.createElement('div');
    alertContainer.style.display = 'block';
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  }
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => evt.key === 'Enter';

export {getRandomArrayElement, getRandomNumber, getOfferType, showError, isEscEvent, isEnterEvent};
