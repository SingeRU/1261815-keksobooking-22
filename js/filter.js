import {mapForm} from './form.js';

const filterType = mapForm.querySelector('#housing-type');
// const filterPrice = mapForm.querySelector('#housing-price');
// const filterRooms = mapForm.querySelector('#housing-rooms');
// const filterGuests = mapForm.querySelector('#housing-guests');
// const filterFeatures = mapForm.querySelector('#housing-features');

const checkType = (elem) => {
    if(elem.value === filterType.value) {
        return elem.value
    } else {
        return 'any'
    }
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