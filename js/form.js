const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const titleInput = adForm.querySelector('#title');
const currentPrice = adForm.querySelector('#price')
const houseTypeList = adForm.querySelector('#type');
const checkInTime = adForm.querySelector('#timein');
const checkOutTime = adForm.querySelector('#timeout');

const mapForm = document.querySelector('.map__filters');
const mapFormFieldsets = mapForm.querySelectorAll('.map__filter, .map__features');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}
  
const getMinPrice = () => {
  currentPrice.placeholder = minPrice[houseTypeList.value];
  currentPrice.min = minPrice[houseTypeList.value];
}


//FORM UNAVAILABLE

adFormFieldsets.forEach((input) => {
  input.setAttribute('disabled', '');
});

mapForm.classList.add('map__filters--disabled');
mapFormFieldsets.forEach((space) => {
  space.setAttribute('disabled', '');
});

//FORM AVAILABLE

const formActivation = () => {
  adFormFieldsets.forEach((input) => {
    input.removeAttribute('disabled', '');
  });

  mapForm.classList.remove('map__filters--disabled');
  mapFormFieldsets.forEach((space) => {
    space.removeAttribute('disabled', '');
  });
}

//CHECK_IN_TIME CHECK_OUT_TIME CONNECTION

const onCheckInTime = () => {
  checkOutTime.value = checkInTime.value;
}
const onCheckOutTime = () => {
  checkInTime.value = checkOutTime.value;
}

checkInTime.addEventListener('change', onCheckInTime);
checkOutTime.addEventListener('change', onCheckOutTime);

//HOUSE_TYPE CONNECTION

const onHouseType = () => {
  getMinPrice();
}

const onCurrentPrice = () => {
  getMinPrice();
  if(currentPrice.value < currentPrice.min) {
    currentPrice.setCustomValidity('Минимальная цена за ночь ' + currentPrice.min + ' руб.');
  } else {
    currentPrice.setCustomValidity('');
  }

};

currentPrice.addEventListener('input', onCurrentPrice);
houseTypeList.addEventListener('change', onHouseType);

//FORM VALIDATION

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

export {formActivation};

