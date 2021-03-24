import {offerShow} from './card.js';
import {formActivation, getAddress, showError} from './form.js';
import {getData} from './data.js';
import {setFilterChange, getFilteredOffer} from './filter.js';
/* global L:readonly */
/* global _:readonly */

const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;
const STARTING_ZOOM = 10;
const ADDS_LIMIT = 10;
const RENDER_DELAY = 500;

const map = L.map('map-canvas')
  .on('load', formActivation)
  .setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },STARTING_ZOOM);

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
).addTo(map);

const onPinMove = (evt) => {
  const lat = evt.target.getLatLng().lat;
  const long = evt.target.getLatLng().lng;
  getAddress(lat, long);
}

mainPinMarker.on('move', onPinMove);



const createDefaultPin = (poster) => {

  poster
    .slice(0, ADDS_LIMIT)
    .filter(getFilteredOffer)
    .forEach((offer) => {
    const {location} = offer;

    const defaultPinIcon = L.icon ({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker (
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon:defaultPinIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        offerShow(offer),
        {
        },
      );
    marker.on('click', onPinMove);  

  });
};

//MAP RESET
const resetMap = () => {
  map.setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },STARTING_ZOOM);

  mainPinMarker.setLatLng(L.latLng(STARTING_LATITUDE, STARTING_LONGITUDE));
};

getData((data) => {
  createRegularPin(data);
  setFilterChange(_.debounce(() => createDefaultPin(data), RENDER_DELAY));
}, showError);

export {resetMap};


