const FIXED_NUMBER = 5;
const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then ((response => {
      if (response.ok) {
        return response.json();
      }
      onError(`Не удалось загрузить данные об объектах: ${response.text}`);
    }))
    .then(onSuccess)
    .catch(onError);
};

const sendData = (url, onSuccess, onError, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onError();
    })
    .catch(onError);
};

export {getData, sendData};
export {FIXED_NUMBER, GET_URL, POST_URL};
