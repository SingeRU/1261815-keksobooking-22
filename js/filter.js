import {mapForm} from './form.js';

const filterType = mapForm.querySelector('#housing-type');
// const filterPrice = mapForm.querySelector('#housing-price');
// const filterRooms = mapForm.querySelector('#housing-rooms');
// const filterGuests = mapForm.querySelector('#housing-guests');
// const filterFeatures = mapForm.querySelector('#housing-features');

const checkType = (data) => {
  return filterType.value === 'any' || data.offer.type === filterType.value;
};

const getFilteredOffer = (data) => {
  return (checkType(data))
};

const setFilterChange = (cb) => {
  mapForm.addEventListener('change', () => {
    cb()
  });
};

export {setFilterChange, getFilteredOffer};