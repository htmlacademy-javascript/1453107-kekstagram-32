import { isEscapeKey } from './utils.js';

const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');

const bigPictureImg = bigPictureModal
  .querySelector('.big-picture__img')
  .querySelector('img');

const likesCount = bigPictureModal.querySelector('.likes-count');
const descriptionText = bigPictureModal.querySelector('.social__caption');

const commentCount = bigPictureModal.querySelector('.social__comment-count');
const shownCommentsCount = commentCount.querySelector('.social__comment-shown-count');
const allCommentsCount = commentCount.querySelector('.social__comment-total-count');

const commentSection = bigPictureModal.querySelector('.social__comments');
const moreCommentsButton = bigPictureModal.querySelector('.comments-loader');

let onMoreCommentsButtonClick;


const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const getCommentSectionFragment = (comments) => {
  const commentSectionFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const newCommentBlock = createElement('li', 'social__comment');

    const avatarImg = createElement('img', 'social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    avatarImg.style.width = '35px';
    avatarImg.style.height = '35px';
    newCommentBlock.append(avatarImg);

    const text = createElement('p', 'social__text');
    text.textContent = message;
    newCommentBlock.append(text);

    commentSectionFragment.append(newCommentBlock);
  });

  return commentSectionFragment;
};

const setComments = (comments) => {
  let startIndex = 0;

  return function () {
    let endIndex = startIndex + 5;

    if (endIndex >= comments.length) {
      endIndex = comments.length;
      moreCommentsButton.classList.add('hidden');
    }

    const appendableComments = comments.slice(startIndex, endIndex);
    commentSection.append(getCommentSectionFragment(appendableComments));

    startIndex += 5;

    shownCommentsCount.textContent = endIndex;
    allCommentsCount.textContent = comments.length;
  };
};

const setPictureData = ({url, description, likes, comments}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  descriptionText.textContent = description;

  commentSection.innerHTML = '';
  onMoreCommentsButtonClick = setComments(comments);
  onMoreCommentsButtonClick();

  moreCommentsButton.addEventListener('click', onMoreCommentsButtonClick);
};

const openBigPictureModal = (pictureData) => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setPictureData(pictureData);

  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseModalButtonClick = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  moreCommentsButton.classList.remove('hidden');

  moreCommentsButton.removeEventListener('click', onMoreCommentsButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    onCloseModalButtonClick();
  }
}

closeModalButton.addEventListener('click', onCloseModalButtonClick);

export { openBigPictureModal } ;
