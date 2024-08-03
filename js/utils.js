const DEBOUNCE_DELAY = 500;


const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getArrayOfRandomNumbers = (amount, maxNumber) => {
  const numbers = [];

  while (numbers.length < amount) {

    let newNumber = getRandomNumber(0, maxNumber);
    while (numbers.includes(newNumber)) {
      newNumber = getRandomNumber(0, maxNumber);
    }

    numbers.push(newNumber);
  }

  return numbers;
};

const isEscapeKey = (evt) => evt.code === 'Escape';

const hasAllowedTagName = (element, tagNames) => tagNames.includes(element.tagName);

const existingChildren = (parent, tagName) => Array
  .from(parent.children)
  .filter((element) => hasAllowedTagName(element, [tagName]));

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getArrayOfRandomNumbers,
  isEscapeKey,
  hasAllowedTagName,
  existingChildren,
  debounce
};
