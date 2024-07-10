import { isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const closeModalBtn = document.querySelector('.big-picture__cancel');

const bigPictureImg = bigPictureModal
  .querySelector('.big-picture__img')
  .querySelector('img');

const likesCount = bigPictureModal.querySelector('.likes-count');
const descriptionText = bigPictureModal.querySelector('.social__caption');

const commentCount = bigPictureModal.querySelector('.social__comment-count');
const shownCommentsCount = commentCount.querySelector('.social__comment-shown-count');
const allCommentsCount = commentCount.querySelector('.social__comment-total-count');

const commentSection = bigPictureModal.querySelector('.social__comments');
const moreCommentsBtn = bigPictureModal.querySelector('.comments-loader');


const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const getComments = (arrayOfComments) => {
  const commentSectionFragment = document.createDocumentFragment();

  arrayOfComments.forEach(({avatar, name, message}) => {
    const newCommentBlock = createElement('li', 'social__comment');

    const avatarImg = createElement('img', 'social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    avatarImg.style.width = '35';
    avatarImg.style.height = '35';
    newCommentBlock.append(avatarImg);

    const text = createElement('p', 'social__text');
    text.textContent = message;
    newCommentBlock.append(text);

    commentSectionFragment.append(newCommentBlock);
  });

  return commentSectionFragment;
};

const setPictureData = ({url, description, likes, comments}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;

  shownCommentsCount.textContent = comments.length;
  allCommentsCount.textContent = comments.length;

  descriptionText.textContent = description;

  commentSection.innerHTML = '';
  commentSection.append(getComments(comments));
};

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPictureModal();
  }
};

const openBigPictureModal = (pictureData) => {
  bigPictureModal.classList.remove('hidden');

  commentCount.classList.add('hidden');
  moreCommentsBtn.classList.add('hidden');

  document.body.classList.add('modal-open');

  setPictureData(pictureData);

  document.addEventListener('keydown', onDocumentKeydown);
};

closeModalBtn.addEventListener('click', closeBigPictureModal);

export { openBigPictureModal } ;
