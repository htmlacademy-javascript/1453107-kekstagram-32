import { getArrayOfRandomNumbers, hasAllowedTagName } from './utils.js';

const MAX_RANDOM_PHOTOS = 10;

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

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


export { setImgFilters, getFilteredArray };
