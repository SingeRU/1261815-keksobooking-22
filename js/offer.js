import {getRandomNumber, getRandomArrayElement} from './utils.js';

const AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];
  
const TITLE = [
  'Скидка 10% Молодожёнам',
  'Квартира в новстройке',
  'Квартира с ремонотом',
  'Новый жилой комплекс',
];
  
  
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
  
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
  
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
  
const FEATURES = [
  'wifi',
  'dishwasher', 
  'parking', 
  'washer', 
  'elevator', 
  'conditioner',
];
  
const DESCRIPTION = [
  '2-комн. квартира, 54,7 м²',
  '4-комн. квартира 84,1 м²',
  '1-комн. квартира, 45,2 м²',
  '1-комн. квартира, 37 м²',
  'Многокомнатная квартира, 426 м²',
];
  
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
  
const NEW_OFFER_COUNT = 10;
  
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
  
let createOffers = () => new Array(NEW_OFFER_COUNT).fill(null).map(() => createOffer());

export {createOffers};
