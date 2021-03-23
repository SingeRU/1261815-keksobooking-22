const FIXED_NUMBER = 5;
const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  return fetch(GET_URL)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    POST_URL,
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
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
export {FIXED_NUMBER, POST_URL};
