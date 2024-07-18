import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import { isEscapeKey, isNotFormInput } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const SCALE_STEP = 25;

const form = document.querySelector('.img-upload__form');
const imgInput = document.querySelector('.img-upload__input');
const closeBtn = document.querySelector('.img-upload__cancel');

const imgScaleFieldset = document.querySelector('.img-upload__scale');
const scaleSmallerBtn = imgScaleFieldset.querySelector('.scale__control--smaller');
const scaleBiggerBtn = imgScaleFieldset.querySelector('.scale__control--bigger');
const imgScaleInput = imgScaleFieldset.querySelector('.scale__control--value');

const imgPreview = document
  .querySelector('.img-upload__preview')
  .querySelector('img');
// const smallPreviews = document.querySelectorAll('.effects__preview');
const effectsList = document.querySelector('.effects__list');


const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const overlay = document.querySelector('.img-upload__overlay');

const effectLevelBox = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const effectSlider = document.querySelector('.effect-level__slider');

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


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower'
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

const openUploadImgModal = () => {
  // imgScaleInput.value = `100%`;
  //-----
  // imgPreview.src = '../img/logo-background-2.jpg';
  // smallPreviews.forEach((preview) => {
  //   preview.style.backgroundImage = 'url(../img/logo-background-2.jpg)';
  // });
  //-----
  currentImgEffect = 'none';
  effectSlider.noUiSlider.set();

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
    console.log('Можно отправлять');
    closeUploadImgModal();
  } else {
    console.log('Форма невалидна');
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







const getScaleValueAsNumber = () => Number.parseInt(imgScaleInput.value, 10);

const makeImgSmaller = () => {
  const currentValue = getScaleValueAsNumber();
  const newValue = currentValue <= SCALE_STEP ? SCALE_STEP : currentValue - SCALE_STEP;

  imgScaleInput.value = `${newValue}%`;
  // changeImgScale();
};

const makeImgBigger = () => {
  const currentValue = getScaleValueAsNumber();
  const newValue = currentValue > 100 - SCALE_STEP ? 100 : currentValue + SCALE_STEP;

  imgScaleInput.value = `${newValue}%`;
  // changeImgScale();
};

const changeImgScale = () => {
  const value = getScaleValueAsNumber();
  console.log(value / 100);
  imgPreview.style.transform = `scale(${value / 100})`;
};

scaleSmallerBtn.addEventListener('click', makeImgSmaller);
scaleBiggerBtn.addEventListener('click', makeImgBigger);

imgScaleInput.addEventListener('input', changeImgScale);










const changeEffect = (evt) => {
  const effect = evt.target.value;

  const newOptions = effectsData[effect].effectsObj;
  currentImgEffect = effect;

  effectSlider.noUiSlider.updateOptions(newOptions);
};

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

effectsList.addEventListener('change', changeEffect);

