import {FIXED_NUMBER, POST_URL} from './data.js';
import {sendData} from './data.js';
import {resetMap} from './map.js'

const ALERT_SHOW_TIME = 5000;

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const titleInput = adForm.querySelector('#title');
const currentPrice = adForm.querySelector('#price');
const address = adForm.querySelector('#address');
const houseTypeList = adForm.querySelector('#type');
const checkInTime = adForm.querySelector('#timein');
const checkOutTime = adForm.querySelector('#timeout');
const selectRoomNumber = adForm.querySelector('#room_number');
const resetButton = adForm.querySelector('.ad-form__reset');
const selectCapacity = adForm.querySelector('#capacity');

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

const getAddress = (lat, lng) => {
  const latitude = lat.toFixed(FIXED_NUMBER);
  const longitude = lng.toFixed(FIXED_NUMBER);
  address.value = `${latitude} ${longitude}`
};

const numberOfRooms = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

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

//ROOMINESS CHECK
const roominess = () => {
  const capacityOptions = selectCapacity.querySelectorAll('option');
  const roomsNumber =  selectRoomNumber.value;
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });

  numberOfRooms[roomsNumber].forEach((numberOfSeats) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === numberOfSeats) {
        option.disabled = false;
      }
    });
    if (!numberOfRooms[roomsNumber].includes(selectCapacity.value)) {
      const maxCapacity = numberOfRooms[roomsNumber][numberOfRooms[roomsNumber].length - 1];
      selectCapacity.value = maxCapacity;
    }
  });
};

selectRoomNumber.addEventListener('input', roominess)

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

  currentPrice.reportValidity();
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

//SUCCESS POPUP

const showSuccess = () => {
  const successPopup = document.createElement('div');

  successPopup.style.width = '330px';
  successPopup.style.height = '150px';
  successPopup.style.position = 'absolute';
  successPopup.style.zIndex = 1000;
  successPopup.style.left = '37%';
  successPopup.style.top = '100%';
  successPopup.style.paddingTop = '66px';
  successPopup.style.fontSize = '15px';
  successPopup.style.fontWeight = 'bold';
  successPopup.style.textAlign = 'center';
  successPopup.style.backgroundColor = 'white';
  successPopup.textContent = 'Ваше объявление успешно размещено!'
  document.body.append(successPopup);

  setTimeout(() => successPopup.remove(), ALERT_SHOW_TIME);
};

//ERROR POPUP
const showError = () => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Неудалось отправить форму! Попробуйте ещё раз.';
  
  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};


//RESET
const formReset = () => {
  adForm.reset();
  mapForm.reset();
  resetMap();
}

//FORM SUBMIT
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(
    POST_URL,
    showSuccess, 
    showError, 
    formData);
  formReset();
});

//FORM RESET
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
})
export {formActivation, getAddress, showError};

