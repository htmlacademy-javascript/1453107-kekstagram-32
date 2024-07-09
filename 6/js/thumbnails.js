import { createArrayOfObjects } from './util.js';
import { getPhotoObj } from './data.js';

const gallery = document.querySelector('.pictures');
const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const showThumbnails = (amount) => {
  const thumbnailsArray = createArrayOfObjects(amount, getPhotoObj);
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
};

export { showThumbnails };
