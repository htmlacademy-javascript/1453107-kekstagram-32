import {
  getRandomNumber,
  getRandomItemFromArray,
  createArrayOfObjects,
  getId,
  getUrl
} from './util.js';

const MAX_AMOUNT_PHOTOS = 25;

const MAX_AMOUNT_MESSAGES = 2;
const MAX_AMOUNT_AVATARS = 6;
const MIN_AMOUNT_LIKES = 15;
const MAX_AMOUNT_LIKES = 200;
const MAX_AMOUNT_COMMENTS = 30;

const names = [
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

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Мастер быстрых фоток.',
  'Пришлось проснуться в 4 утра для этого кадра.',
  'Не могу поверить, что получилось заснять этот момент!',
  'Ура! Горизонт ровный вышел!',
  'Любимое время года.'
];


const getPhotoId = getId();
const getCommentId = getId();

const getPhotoUrl = getUrl('photos', 'jpg');
const getAvatarUrl = getUrl('img', 'svg');


const getMessage = () => {
  const amount = getRandomNumber(1, MAX_AMOUNT_MESSAGES);
  const messages = [];

  while (messages.length < amount) {
    const newMessage = getRandomItemFromArray(comments);

    if (!messages.includes(newMessage)) {
      messages.push(newMessage);
    }
  }

  return messages.join(' ');
};

const getCommentObj = () => {
  const title = `avatar-${getRandomNumber(1, MAX_AMOUNT_AVATARS)}`;
  return {
    id: getCommentId(),
    avatar: getAvatarUrl(title),
    message: getMessage(),
    name: getRandomItemFromArray(names)
  };
};

const getPhotoObj = () => {
  const id = getPhotoId();
  return {
    id,
    url: getPhotoUrl(id),
    description: getRandomItemFromArray(descriptions),
    likes: getRandomNumber(MIN_AMOUNT_LIKES, MAX_AMOUNT_LIKES),
    comments: createArrayOfObjects(getRandomNumber(0, MAX_AMOUNT_COMMENTS), getCommentObj)
  };
};

const thumbnails = createArrayOfObjects(MAX_AMOUNT_PHOTOS, getPhotoObj);


export { thumbnails };
