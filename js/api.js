const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((res) => {
      console.log(`---${method}---`);
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (formData) => load(Route.SEND_DATA, ErrorText.SEND_DATA, 'POST', formData);


export {getData, sendData};
