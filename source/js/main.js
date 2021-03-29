import './map.js';
import './data.js';
import './utils.js';
import './filter.js';
import './form.js';
import './card.js';
import './popup.js';

import {getData, GET_URL} from './data.js';
import {showError} from './utils.js';
import {setFilterChange} from './filter.js';
import {removeMarkers, createDefaultPin} from './map.js';
import {resetButton, formReset} from './form.js';


const RENDER_DELAY = 500;
const ERROR_MESSAGE = 'Не удалось загрузить данные об объектах';

getData(GET_URL, (data) => {
    createDefaultPin(data);
    setFilterChange(_.debounce(() => {
      removeMarkers();
      createDefaultPin(data);
    }, RENDER_DELAY));
    formReset();
     
}, showError(ERROR_MESSAGE));