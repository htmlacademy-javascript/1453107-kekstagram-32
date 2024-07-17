import '../vendor/pristine/pristine.min.js';

import { isEscapeKey, isNotFormInput } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const imgInput = document.querySelector('.img-upload__input');
const closeBtn = document.querySelector('.img-upload__cancel');

// const imgPreview = document
//   .querySelector('.img-upload__preview')
//   .querySelector('img');
// const smallPreviews = document.querySelectorAll('.effects__preview');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const overlay = document.querySelector('.img-upload__overlay');


const hashtagReg = /^#[а-яёa-z0-9]{1,19}$/;

const hashtagsErrorMessageTemplates = {
  default:'Поле заполнено некорректно.',
  limitCount: `Может быть не более ${MAX_HASHTAGS_COUNT} хэштегов.`,
  spellingError: 'Хэштег должен начинаться с &laquo;#&raquo; и может состоять только из букв и чисел.',
  lengthLimit: `Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку.`,
  duplicate: 'Один и тот же хэштег не может быть использован дважды.'
};

const errorMessage = {
  hashtag: hashtagsErrorMessageTemplates.default,
  description: 'Длина комментария не может составлять больше 140 символов.'
};


let pristine;


const validateHashtag = (value) => {

  const hashtagsArray = value
    .toLowerCase()
    .replaceAll(' ', '')
    .replaceAll('#', '_#')
    .split('_')
    .filter((i) => i);

  if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
    errorMessage.hashtag = hashtagsErrorMessageTemplates.limitCount;
    return false;
  }

  let isValid = true;

  hashtagsArray.forEach((hashtag) => {

    if (!hashtagReg.test(hashtag)) {
      errorMessage.hashtag = hashtagsErrorMessageTemplates.spellingError;
      isValid = false;
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorMessage.hashtag = hashtagsErrorMessageTemplates.lengthLimit;
      isValid = false;
    }

    if (hashtagsArray.filter((i) => i === hashtag).length > 1) {
      errorMessage.hashtag = hashtagsErrorMessageTemplates.duplicate;
      isValid = false;
    }
  });

  return isValid;
};

const validateDescription = (value) => value.length < MAX_DESCRIPTION_LENGTH;

const getHashtagsErrorText = () => errorMessage.hashtag;

const addValidators = () => {

  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  }, true);

  pristine.addValidator(
    hashtagsInput,
    validateHashtag,
    getHashtagsErrorText,
    1,
    false
  );

  pristine.addValidator(
    descriptionInput,
    validateDescription,
    errorMessage.description,
    1,
    false
  );
};

const openUploadImgModal = () => {
  //-----
  // imgPreview.src = '../img/logo-background-2.jpg';
  // smallPreviews.forEach((preview) => {
  //   preview.style.backgroundImage = 'url(../img/logo-background-2.jpg)';
  // });
  //-----

  document.activeElement.blur();

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  form.addEventListener('submit', onFormSubmit);

  addValidators();
};

const closeUploadImgModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);

  form.reset();
  pristine.reset();
  pristine.destroy();
};


function onFormSubmit (evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // console.log('Можно отправлять');
    closeUploadImgModal();
  } else {
    // console.log('Форма невалидна');
  }
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && isNotFormInput()) {
    closeUploadImgModal();
  }
}

const imgInputListener = () => {
  imgInput.addEventListener('change', openUploadImgModal);
};

closeBtn.addEventListener('click', closeUploadImgModal);


export { imgInputListener };
