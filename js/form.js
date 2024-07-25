import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import { isEscapeKey, isNotFormInput, hasAllowedTagName } from './util.js';
import { sendData } from './api.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const SCALE_STEP = 25;

const IMGS_FORMATS = ['jpg', 'jpeg', 'png'];

const overlay = document.querySelector('.img-upload__overlay');

const form = document.querySelector('.img-upload__form');
const imgInput = form.querySelector('.img-upload__input');
const closeBtn = form.querySelector('.img-upload__cancel');
const submitBtn = form.querySelector('.img-upload__submit');

const imgScaleFieldset = form.querySelector('.img-upload__scale');
const imgScaleInput = imgScaleFieldset.querySelector('.scale__control--value');

const imgPreview = form
  .querySelector('.img-upload__preview')
  .querySelector('img');
const smallPreviews = form.querySelectorAll('.effects__preview');
const effectsList = form.querySelector('.effects__list');

const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const effectLevelBox = form.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelBox.querySelector('.effect-level__value');
const effectSlider = effectLevelBox.querySelector('.effect-level__slider');

const successMessageTemplate = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document
  .querySelector('#error')
  .content
  .querySelector('.error');

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

const effectsData = {
  chrome: {
    effectsObj : {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    effectsObj : {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    effectsObj : {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    effectsObj : {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    effectsObj : {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    filter: 'brightness',
    unit: ''
  },
  none: {
    effectsObj : {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    }
  }
};


let pristine;
let currentImgEffect = 'none';
let popupMessage = null;


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower'
});

effectSlider.noUiSlider.on('update', () => {
  const value = effectSlider.noUiSlider.get();

  if (currentImgEffect === 'none') {
    imgPreview.style.filter = 'none';
    effectLevelValue.value = '';
    effectLevelBox.classList.add('hidden');

  } else {
    const filter = effectsData[currentImgEffect].filter;
    const unit = effectsData[currentImgEffect].unit;

    imgPreview.style.filter = `${filter}(${value}${unit})`;
    effectLevelValue.value = value;
    effectLevelBox.classList.remove('hidden');
  }
});


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

const chageImgScale = (evt) => {

  if (!hasAllowedTagName(evt.target, ['BUTTON'])) {
    return;
  }

  const currentValue = Number.parseInt(imgScaleInput.value, 10);
  let newValue;

  if (evt.target.classList.contains('scale__control--smaller')) {
    newValue = currentValue <= SCALE_STEP ? SCALE_STEP : currentValue - SCALE_STEP;
  } else {
    newValue = currentValue > 100 - SCALE_STEP ? 100 : currentValue + SCALE_STEP;
  }

  imgScaleInput.value = `${newValue}%`;
  imgPreview.style.transform = `scale(${newValue / 100})`;
};

const changeEffect = (evt) => {
  const effect = evt.target.value;

  const newOptions = effectsData[effect].effectsObj;
  currentImgEffect = effect;

  effectSlider.noUiSlider.updateOptions(newOptions);
};

const setUploadedImg = (file) => {
  const imgUrl = URL.createObjectURL(file);
  imgPreview.src = imgUrl;
  smallPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imgUrl})`;
  });
};

const openUploadImgModal = () => {
  const file = imgInput.files[0];
  const isRightFormat = IMGS_FORMATS
    .some((format) => file.name.toLowerCase().endsWith(format));

  if (!isRightFormat) {
    return;
  }

  setUploadedImg(file);

  imgPreview.style.transform = 'none';
  currentImgEffect = 'none';
  effectSlider.noUiSlider.set();

  document.activeElement.blur();

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imgScaleFieldset.addEventListener('click', chageImgScale);
  effectsList.addEventListener('change', changeEffect);

  document.addEventListener('keydown', onDocumentKeydownModal);
  form.addEventListener('submit', onFormSubmit);

  addValidators();
};

const closeUploadImgModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgScaleFieldset.removeEventListener('click', chageImgScale);
  effectsList.removeEventListener('change', changeEffect);

  document.removeEventListener('keydown', onDocumentKeydownModal);
  form.removeEventListener('submit', onFormSubmit);

  form.reset();
  pristine.reset();
  pristine.destroy();
};

const closePopupMessage = () => {
  document.body.removeChild(popupMessage);

  popupMessage.removeEventListener('click', onPopupMessageClick);
  document.addEventListener('keydown', onDocumentKeydownModal);
  document.removeEventListener('keydown', onDocumentKeydownPopups);

  popupMessage = null;
  document.body.classList.remove('modal-open');
};

const showPopupMessage = (template) => {
  popupMessage = template.cloneNode(true);

  popupMessage.addEventListener('click', onPopupMessageClick);
  document.removeEventListener('keydown', onDocumentKeydownModal);
  document.addEventListener('keydown', onDocumentKeydownPopups);

  document.body.append(popupMessage);
  document.body.classList.add('modal-open');
};

function onFormSubmit (evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitBtn.disabled = true;

    const formData = new FormData(form);
    sendData(formData)
      .then(() => {
        closeUploadImgModal();
        showPopupMessage(successMessageTemplate);
      })
      .catch(() => {
        showPopupMessage(errorMessageTemplate);
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  }
}

const imgInputListener = () => {
  imgInput.addEventListener('change', openUploadImgModal);
};


function onDocumentKeydownModal (evt) {
  if (isEscapeKey(evt) && isNotFormInput()) {
    closeUploadImgModal();
  }
}

function onDocumentKeydownPopups (evt) {
  if (isEscapeKey(evt) && popupMessage) {
    closePopupMessage();
  }
}

function onPopupMessageClick (evt) {
  if (popupMessage && hasAllowedTagName(evt.target, ['SECTION', 'BUTTON'])) {
    closePopupMessage();
  }
}


closeBtn.addEventListener('click', closeUploadImgModal);


export { imgInputListener };
