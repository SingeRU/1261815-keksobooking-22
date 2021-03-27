import {mapForm} from './form.js';

const filterType = mapForm.querySelector('#housing-type');
const filterPrice = mapForm.querySelector('#housing-price');
const filterRooms = mapForm.querySelector('#housing-rooms');
const filterGuests = mapForm.querySelector('#housing-guests');
const filterFeatures = mapForm.querySelector('#housing-features');

const checkType = (data) => {
  return filterType.value === 'any' || data.offer.type === filterType.value;
};

const checkPrice = (data) => {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  switch (filterPrice.value) {
    case 'any':
      return true;
    case 'low':
      return data.offer.price < LOW_PRICE;
    case 'middle':
      return data.offer.price >= LOW_PRICE && data.offer.price < HIGH_PRICE;
    case 'high':
      return data.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
}

const checkRooms = (data) => {
  return filterRooms.value === 'any' || data.offer.rooms === Number(filterRooms.value);
}

const checkGuests = (data) => {
  return filterGuests.value === 'any' || data.offer.guests === Number(filterGuests.value);
}

const checkFeatures = (data) => {
  const checkedFeatures = filterFeatures.querySelectorAll('.map__checkbox:checked');

  let count = 0;
  checkedFeatures.forEach((feature) => {
    if(data.offer.features.includes(feature.value))
      count++;
  })

  return count === checkedFeatures.length;
}

const getFilteredOffer = (data) => {
  return (
    checkType(data) &&
    checkPrice(data) &&
    checkRooms(data) &&
    checkGuests(data) &&
    checkFeatures(data)
  ) 
};

const setFilterChange = (cb) => {
  mapForm.addEventListener('change', () => {
    cb()
  });
};

export {setFilterChange, getFilteredOffer};