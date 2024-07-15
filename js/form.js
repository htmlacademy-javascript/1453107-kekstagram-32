import '../vendor/pristine/pristine.min.js';

import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
// const imgInput = document.querySelector('.img-upload__input');
const closeBtn = document.querySelector('.img-upload__cancel');

// const imgPreview = document
//   .querySelector('.img-upload__preview')
//   .querySelector('img');
// const smallPreviews = document.querySelectorAll('.effects__preview');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const overlay = document.querySelector('.img-upload__overlay');

const hashtagReg = /^#[а-яёa-z0-9]{1,19}$/;

const errorMessage = {
  hashtag: 'Поле заполнено некорректно.',
  description: 'Длина комментария не может составлять больше 140 символов.'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, true);


const validateHashtag = (value) => {

  const array = value.toLowerCase().split(' ');

  if (array.length > 5) {
    errorMessage.hashtag = 'Может быть не более 5 хэштегов.';
    return false;
  }

  let isValid = true;

  array.forEach((item) => {

    if (item && !hashtagReg.test(item)) {
      errorMessage.hashtag = 'Хэштег должен начинаться с &laquo;#&raquo; и может состоять только из букв и чисел.';
      isValid = false;
    }

    if (item.length > 20) {
      errorMessage.hashtag = 'Максимальная длина одного хэштега 20 символов, включая решётку.';
      isValid = false;
    }

    if (array.filter((i) => i === item).length > 1) {
      errorMessage.hashtag = 'Один и тот же хэштег не может быть использован дважды.';
      isValid = false;
    }
  });

  console.log(`validateHashtag --- ${isValid}`);
  return isValid;
};

const validateDescription = (value) => value.length < 140;

const getHashtagsErrorText = () => errorMessage.hashtag;

const addValidators = () => {
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

const destroyValidators = () => {
  pristine.destroy();
};


const openUploadImgModal = () => {
  //-----
  // imgPreview.src = '../img/logo-background-2.jpg';
  // smallPreviews.forEach((preview) => {
  //   preview.style.backgroundImage = 'url(../img/logo-background-2.jpg)';
  // });
  //-----

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  form.addEventListener('submit', onFormSubmit);

  addValidators();
};

const closeUploadImgModal = () => {
  form.reset();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);

  destroyValidators();
};


function onFormSubmit (evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  console.log(`onFormSubmit --- ${isValid}`);

  if (isValid) {
    console.log('Можно отправлять');
    closeUploadImgModal();
  } else {
    console.log('Форма невалидна');
  }
}

function onDocumentFocusin() {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentFocusout() {
  document.addEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeUploadImgModal();
  }
}


// imgInput.addEventListener('change', () => {
//   openUploadImgModal();
// });

closeBtn.addEventListener('click', closeUploadImgModal);

hashtagsInput.addEventListener('focusin', onDocumentFocusin);
hashtagsInput.addEventListener('focusout', onDocumentFocusout);

descriptionInput.addEventListener('focusin', onDocumentFocusin);
descriptionInput.addEventListener('focusout', onDocumentFocusout);




//------------------
openUploadImgModal();
