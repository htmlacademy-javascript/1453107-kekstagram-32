import { openBigPictureModal } from './big-picture.js';
import { getData } from './api.js';
import { hasAllowedTagName, getArrayOfRandomNumbers, existingChildren, debounce } from './util.js';

const MAX_RANDOM_PHOTOS = 10;
const MESSAGE_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

const gallery = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

let currentFilter = 'filter-default';


const getFilteredArray = (array) => {
  const newArray = [];
  let arrayOfRandomNumbers;

  switch (currentFilter) {
    case 'filter-random':
      arrayOfRandomNumbers = getArrayOfRandomNumbers(MAX_RANDOM_PHOTOS, array.length - 1);

      arrayOfRandomNumbers.forEach((number) => {
        newArray.push(array[number]);
      });

      return newArray;

    case 'filter-discussed':
      return array.slice().sort((a, b) => b.comments.length - a.comments.length);

    default:
      return array;
  }
};

const renderThumbnails = (thumbnailsArray) => {
  const thumbnailsGalleryFragment = document.createDocumentFragment();

  const newThumbnailsArray = getFilteredArray(thumbnailsArray);

  newThumbnailsArray
    .forEach(({id, url, description, likes, comments}) => {
      const newThumbnail = thumbnailTemplate.cloneNode(true);

      newThumbnail.dataset.photoId = id;

      const picture = newThumbnail.querySelector('.picture__img');
      picture.src = url;
      picture.alt = description;

      newThumbnail.querySelector('.picture__likes').textContent = likes;
      newThumbnail.querySelector('.picture__comments').textContent = comments.length;

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
      openBigPictureModal(thumbnailsArray.find((el) => el.id === photoId));
    }
  });
};

const showErrorMessage = (text) => {
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  newErrorMessage.querySelector('.data-error__title').textContent = text;
  document.body.append(newErrorMessage);

  setTimeout(() => {
    document.body.removeChild(newErrorMessage);
  }, MESSAGE_SHOW_TIME);
};

const setImgFilters = (cb) => {
  filters.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const targetElement = evt.target;
    if (!hasAllowedTagName(targetElement, ['BUTTON'])) {
      return;
    }

    filtersForm.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    targetElement.classList.add('img-filters__button--active');

    currentFilter = targetElement.id;
    cb();
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
