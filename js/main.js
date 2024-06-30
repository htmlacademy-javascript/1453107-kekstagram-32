const namesArray = [
  'Ева',
  'Максим',
  'Полина',
  'Алиса',
  'Екатерина',
  'Артём',
  'Валерия',
  'Захар',
  'Кира',
  'Александр',
];

const messagesArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptionsArray = [
  'Мастер быстрых фоток.',
  'Пришлось проснуться в 4 утра для этого кадра.',
  'Не могу поверить, что получилось заснять этот момент!',
  'Ура! Горизонт ровный вышел!',
  'Любимое время года.'
];


const getId = () => {
  let i = 1;
  return function () {
    return i++;
  };
};

const getPhotoId = getId();
const getCommentId = getId();

const getUrl = (folder, format) => function (title) {
  return `${folder}/${title}.${format}`;
};

const getPhotoUrl = getUrl('photos', 'jpg');
const getAvatarUrl = getUrl('img', 'svg');

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)];


const getMessage = () => {
  const ammount = getRandomNumber(1, 2);
  const messages = [];

  while (messages.length < ammount) {
    messages.push(getRandomItemFromArray(messagesArray));
  }

  return messages.join(' ');
};

const getCommentObj = () => {
  const title = `avatar-${getRandomNumber(1, 6)}`;
  return {
    id: getCommentId(),
    avatar: getAvatarUrl(title),
    message: getMessage(),
    name: getRandomItemFromArray(namesArray)
  };
};

const getComments = () => {
  const comments = [];
  const ammount = getRandomNumber(0, 30);

  while (comments.length < ammount) {
    comments.push(getCommentObj());
  }

  return comments;
};

const getPhotoObj = () => {
  const id = getPhotoId();
  return {
    id,
    url: getPhotoUrl(id),
    description: getRandomItemFromArray(descriptionsArray),
    likes: getRandomNumber(15, 200),
    comments: getComments()
  };
};


const gallery = Array.from({length: 25}, getPhotoObj);
console.log(gallery);
