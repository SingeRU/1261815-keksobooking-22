import {getRandomNumber, getRandomArrayElement} from './utils.js';
import {AVATAR, TITLE, TYPE, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS, NEW_OFFER_COUNT} from './data.js';

const createOffer = () => {
  return {
    author: {
      avatar: getRandomArrayElement(AVATAR),
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: getRandomNumber(0, 180) + ' ' + getRandomNumber(0, 180),
      price: getRandomNumber(500000, 1400000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(1, 8),
      guests: getRandomNumber(1, 16),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: FEATURES.slice(0, getRandomNumber(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: PHOTOS.slice(0, getRandomNumber(0, PHOTOS.length)),
    },
    location: {
      locationX: getRandomNumber(35.65000, 35.70000, 5),
      locationY: getRandomNumber(139.70000, 139.80000, 5),
    },
  }
};
  
const createOffers = () => new Array(NEW_OFFER_COUNT).fill(null).map(() => createOffer());
const offer = createOffers();

export {createOffers, offer};
