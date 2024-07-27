const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const creteThumbnail = ({id, url, description, likes, comments}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);

  const picture = newThumbnail.querySelector('.picture__img');

  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  picture.src = url;
  picture.alt = description;

  newThumbnail.dataset.photoId = id;

  return newThumbnail;
};

export { creteThumbnail };
