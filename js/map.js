import {offerShow} from './card.js';

const MAIN_LOCATION_X = 35.65000;
const MAIN_LOCATION_Y = 139.70000;

const map = L.map('map-canvas')
  .setView({
    lat: MAIN_LOCATION_X,
    lng: MAIN_LOCATION_Y,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_LOCATION_X,
    lng: MAIN_LOCATION_Y,
  },
  {
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

//Создание маркеров
offerShow.forEach((offers) => {  
  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: offers.location.locationX,
      lng: offers.location.locationY,
    },
    {
      icon,
    },
  );
  marker.addTo(map).bindPopup();   
});

