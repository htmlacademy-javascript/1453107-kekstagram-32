import { openBigPictureModal } from './big-picture.js';

const gallery = document.querySelector('.pictures');
const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const showThumbnails = (thumbnailsArray) => {
  const thumbnailsGalleryFragment = document.createDocumentFragment();

  thumbnailsArray.forEach(({id, url, description, likes, comments}) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);

    newThumbnail.dataset.photoId = id;

    const picture = newThumbnail.querySelector('.picture__img');
    picture.src = url;
    picture.alt = description;

    newThumbnail.querySelector('.picture__likes').textContent = likes;
    newThumbnail.querySelector('.picture__comments').textContent = comments.length;

    thumbnailsGalleryFragment.append(newThumbnail);
  });

  gallery.append(thumbnailsGalleryFragment);
};

const galleryListener = (thumbnailsArray) => {

  gallery.addEventListener('click', (evt) => {

    if (evt.target.closest('a')) {
      evt.preventDefault();
      const photoId = Number(evt.target.closest('a').dataset.photoId);
      openBigPictureModal(thumbnailsArray.find((el) => el.id === photoId));
    }
  });
};


export {
  showThumbnails,
  galleryListener
};
