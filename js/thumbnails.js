import { createArrayOfObjects } from './util.js';
import { getPhotoObj } from './data.js';

const MAX_AMOUNT_PHOTOS = 25;

const gallery = document.querySelector('.pictures');
const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailsArray = createArrayOfObjects(MAX_AMOUNT_PHOTOS, getPhotoObj);
const thumbnailsGalleryFragment = document.createDocumentFragment();


thumbnailsArray.forEach(({url, description, likes, comments}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);

  const picture = newThumbnail.querySelector('.picture__img');
  picture.src = url;
  picture.alt = description;

  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnailsGalleryFragment.append(newThumbnail);
});

gallery.append(thumbnailsGalleryFragment);
