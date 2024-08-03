import { getArrayOfRandomNumbers, hasAllowedTagName } from './utils.js';

const MAX_RANDOM_PHOTOS = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

let currentFilter = 'filter-default';


const getFilteredThumbnails = (thumbnails) => {
  const randomThumbnails = [];
  let randomNumbers;

  switch (currentFilter) {
    case 'filter-random':
      randomNumbers = getArrayOfRandomNumbers(MAX_RANDOM_PHOTOS, thumbnails.length - 1);

      randomNumbers.forEach((number) => {
        randomThumbnails.push(thumbnails[number]);
      });

      return randomThumbnails;

    case 'filter-discussed':
      return thumbnails.slice().sort((thumbnailA, thumbnailB) => thumbnailB.comments.length - thumbnailA.comments.length);

    default:
      return thumbnails;
  }
};

const setImgFilters = (cb) => {
  filtersContainer.classList.remove('img-filters--inactive');

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


export { setImgFilters, getFilteredThumbnails };
