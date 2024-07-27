import { getData } from './api.js';
import { creteThumbnail } from './thumbnail.js';
import { setImgFilters, getFilteredArray } from './gallery-filter.js';
import { openBigPictureModal } from './big-picture.js';
import { existingChildren, debounce } from './utils.js';


const MESSAGE_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;


const gallery = document.querySelector('.pictures');
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
  }, MESSAGE_SHOW_TIME);
};

const renderThumbnails = (thumbnailsArray) => {
  const thumbnailsGalleryFragment = document.createDocumentFragment();

  const newThumbnailsArray = getFilteredArray(thumbnailsArray);

  newThumbnailsArray.forEach((data) => {
    const newThumbnail = creteThumbnail(data);
    thumbnailsGalleryFragment.append(newThumbnail);
  });

  while (existingChildren(gallery, 'A').length > 0) {
    gallery.removeChild(gallery.lastChild);
  }

  gallery.append(thumbnailsGalleryFragment);
};

const galleryListener = (thumbnailsArray) => {
  gallery.addEventListener('click', (evt) => {

    if (evt.target.closest('a')) {
      evt.preventDefault();
      const photoId = Number(evt.target.closest('a').dataset.photoId);
      openBigPictureModal(thumbnailsArray
        .find((el) => el.id === photoId));
    }
  });
};

const loadGallery = () => {
  getData()
    .then((res) => {
      renderThumbnails(res);
      galleryListener(res);

      setImgFilters(debounce(
        () => renderThumbnails(res),
        RERENDER_DELAY
      ));
    })
    .catch((err) => showErrorMessage(err.message));
};


export {
  loadGallery
};
