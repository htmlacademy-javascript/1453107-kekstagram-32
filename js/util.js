const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)];

const createArrayOfObjects = (length, objConstructor) => Array.from({length}, objConstructor);

const getId = () => {
  let i = 1;
  return function () {
    return i++;
  };
};

const getUrl = (folder, format) => function (title) {
  return `${folder}/${title}.${format}`;
};

const isEscapeKey = (evt) => evt.code === 'Escape';

const isNotFormInput = () => document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA';

const hasAllowedTagName = (element, tagNamesArray) => tagNamesArray.includes(element.tagName);

export {
  getRandomNumber,
  getRandomItemFromArray,
  createArrayOfObjects,
  getId,
  getUrl,
  isEscapeKey,
  isNotFormInput,
  hasAllowedTagName
};
