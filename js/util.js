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


export {
  getRandomNumber,
  getRandomItemFromArray,
  createArrayOfObjects,
  getId,
  getUrl
};
