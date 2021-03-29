import {FIXED_NUMBER, POST_URL} from './data.js';
import {sendData} from './data.js';
import {resetMap} from './map.js'
import {showErrorPopup, showSuccessPopup} from './popup.js';

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
const MAX_PRICE_PER_NIGHT = 1000000;

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
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

//ROOMS NUMBER CHECK
const onRoomsNumberSelect = () => {
  const capacityOptions = selectCapacity.querySelectorAll('option');
  const roomsNumber = Number(selectRoomNumber.value);
  const availableRooms = numberOfRooms[roomsNumber];

  capacityOptions.forEach((option) => {
    option.disabled = true;
  });

  availableRooms.forEach((numberOfSeats) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === numberOfSeats) {
        option.disabled = false;
      }
    });
    if (!availableRooms.includes(Number(selectCapacity.value))) {
      const maxCapacity = availableRooms[availableRooms.length - 1];
      selectCapacity.value = maxCapacity;
    }
  });
};

// const seatingCapacityOptions = capacitySelect.querySelectorAll('option');
// const roomsNumber =  Number(roomsNumberSelect.value);
// const possibleCapacities = RoomCapacities[roomsNumber];

// seatingCapacityOptions.forEach((option) => {
//   option.disabled = true;
// });

// possibleCapacities.forEach((seatsAmount) => {
//   seatingCapacityOptions.forEach((option) => {
//     if (Number(option.value) === seatsAmount) {
//       option.disabled = false;
//     }
//   });
//   if (!possibleCapacities.includes(Number(capacitySelect.value))) {
//     const maxCapacity = possibleCapacities[possibleCapacities.length - 1];
//     capacitySelect.value = maxCapacity;
//   }
// });

selectRoomNumber.addEventListener('change', onRoomsNumberSelect);

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
  currentPrice.placeholder = minPrices[houseTypeList.value];
  currentPrice.min = minPrices[houseTypeList.value];
};

currentPrice.placeholder = minPrices[houseTypeList.value];

const onPriceInput = () => {
  const price = currentPrice.value;
  const type = houseTypeList.value;
  const minPrice = minPrices[type];

  if (price < minPrice) {
    currentPrice.setCustomValidity(`Стоимость должна быть не менее ${minPrice}`);
  } else if (price > MAX_PRICE_PER_NIGHT) {
    currentPrice.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE_PER_NIGHT}`);
  } else {
    currentPrice.setCustomValidity('');
  }
  currentPrice.reportValidity();
};

currentPrice.addEventListener('input', onPriceInput);
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

//RESET
const formReset = () => {
  adForm.reset();
  mapForm.reset();
  resetMap();
  onRoomsNumberSelect();
}

//FORM SUBMIT
const offerFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(
      POST_URL,
      onSuccess,
      onError,
      formData,
    );
  });
};

//FORM RESET
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
});

offerFormSubmit (() => {
  showSuccessPopup();
  formReset();
}, showErrorPopup)

export {formActivation, getAddress, offerFormSubmit};
export {mapForm, formReset};

