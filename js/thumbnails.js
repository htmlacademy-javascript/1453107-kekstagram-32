import { createArrayOfObjects } from './util.js';
import { getPhotoObj } from './data.js';
import { openBigPictureModal } from './bigPicture.js';

const gallery = document.querySelector('.pictures');
const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

let thumbnailsArray;

const showThumbnails = (amount) => {
  thumbnailsArray = createArrayOfObjects(amount, getPhotoObj);
  const thumbnailsGalleryFragment = document.createDocumentFragment();

  thumbnailsArray.forEach(({id, url, description, likes, comments}) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);

    newThumbnail.id = id;

    const picture = newThumbnail.querySelector('.picture__img');
    picture.src = url;
    picture.alt = description;

    newThumbnail.querySelector('.picture__likes').textContent = likes;
    newThumbnail.querySelector('.picture__comments').textContent = comments.length;

    thumbnailsGalleryFragment.append(newThumbnail);
  });

  gallery.append(thumbnailsGalleryFragment);
};

gallery.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.matches('img')) {
    const pictureId = Number(evt.target.closest('a').id);
    openBigPictureModal(thumbnailsArray[pictureId - 1]);
  }
});

export { showThumbnails };
