import { showThumbnails, galleryListener } from './thumbnails.js';
import { imgInputListener } from './form.js';
import { getData } from './api.js';

const DELAY_TIME = 5000;

const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showErrorMessage = (text) => {
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  newErrorMessage.querySelector('.data-error__title').textContent = text;
  document.body.append(newErrorMessage);

  setTimeout(() => {
    document.body.removeChild(newErrorMessage);
  }, DELAY_TIME);
};


imgInputListener();

getData()
  .then((res) => {
    showThumbnails(res);
    galleryListener(res);
  })
  .catch((err) => showErrorMessage(err.message));

