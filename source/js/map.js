import {offerShow} from './card.js';
import {formActivation, getAddress, formReset} from './form.js';


import {getFilteredOffer} from './filter.js';
/* global L:readonly */
/* global _:readonly */

const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;
const STARTING_ZOOM = 10;
const ADDS_LIMIT = 10;

const onMapLoad = () => {
  formActivation(),
  getAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
}

const map = L.map('map-canvas')
  .on('load', onMapLoad)
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

const markers = [];

const createDefaultPin = (poster) => {

  poster
    .slice()
    .filter(getFilteredOffer)
    .slice(0, ADDS_LIMIT)
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
      markers.push(marker); 
    });

};

//REMOVE MARKER

const removeMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
}

//MAP RESET
const resetMap = () => {
  map.setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },STARTING_ZOOM);

  mainPinMarker.setLatLng(L.latLng(STARTING_LATITUDE, STARTING_LONGITUDE));
};



export {resetMap, removeMarkers, createDefaultPin};


