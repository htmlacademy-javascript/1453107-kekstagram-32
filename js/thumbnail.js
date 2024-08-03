const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const creteThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const photo = thumbnail.querySelector('.picture__img');

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  photo.src = url;
  photo.alt = description;

  thumbnail.dataset.photoId = id;

  return thumbnail;
};

export { creteThumbnail };
