import {offerShow} from './card.js';
import {offer} from './offer.js';
import {formActivation} from './form.js';
/* global L:readonly */

const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;

const map = L.map('map-canvas')
  .on('load', formActivation)
  .setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
  
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
  
const mainPinMarker = L.marker(
  {
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
  
mainPinMarker.addTo(map);

offer.forEach(({author, location, offer}) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const lat = location.locationX;
  const lng = location.locationY;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      offerShow({author, offer}),
      {
        keepInView: true,
      },
    );
});
