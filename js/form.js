import { sendData } from './api.js';
import { isEscapeKey, hasAllowedTagName } from './utils.js';
import { resetTransformStyle, resizeImg } from './picture-scale.js';
import { setEffectSlider, onEffectsListChange } from './picture-effect.js';
import { addValidators, validateForm, clearValidator } from './form-validation.js';
import { showPopupMessage, isPopupClosed } from './form-popups.js';

const IMGS_FORMATS = ['jpg', 'jpeg', 'png'];

const overlay = document.querySelector('.img-upload__overlay');

const form = document.querySelector('.img-upload__form');
const imgInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const imgScaleFieldset = form.querySelector('.img-upload__scale');
const imgScaleInput = imgScaleFieldset.querySelector('.scale__control--value');

const imgPreview = form
  .querySelector('.img-upload__preview')
  .querySelector('img');
const smallPreviews = form.querySelectorAll('.effects__preview');
const effectsList = form.querySelector('.effects__list');

const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const successMessageTemplate = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document
  .querySelector('#error')
  .content
  .querySelector('.error');


const isNotFormInput = () => document.activeElement.name !== 'hashtags' && document.activeElement.name !== 'description';

const onImgScaleFieldsetClick = (evt) => {
  if (hasAllowedTagName(evt.target, ['BUTTON'])) {
    resizeImg(evt.target, imgScaleInput, imgPreview);
  }
};

const setUploadedImg = (file) => {
  const imgUrl = URL.createObjectURL(file);
  imgPreview.src = imgUrl;
  smallPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imgUrl})`;
  });
};

const onImgInputChange = () => {
  const file = imgInput.files[0];
  const isRightFormat = IMGS_FORMATS
    .some((format) => file.name.toLowerCase().endsWith(format));

  if (!isRightFormat) {
    return;
  }

  setUploadedImg(file);

  resetTransformStyle(imgPreview);
  setEffectSlider(imgPreview);

  document.activeElement.blur();

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imgScaleFieldset.addEventListener('click', onImgScaleFieldsetClick);
  effectsList.addEventListener('change', onEffectsListChange);

  document.addEventListener('keydown', onDocumentKeydown);
  form.addEventListener('submit', onFormSubmit);

  addValidators(form, hashtagsInput, descriptionInput);
};

const onCloseButtonClick = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgScaleFieldset.removeEventListener('click', onImgScaleFieldsetClick);
  effectsList.removeEventListener('change', onEffectsListChange);

  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);

  form.reset();
  clearValidator();
};

function onFormSubmit (evt) {
  evt.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    submitButton.disabled = true;

    const formData = new FormData(form);
    sendData(formData)
      .then(() => {
        onCloseButtonClick();
        showPopupMessage(successMessageTemplate);
      })
      .catch(() => {
        showPopupMessage(errorMessageTemplate);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
}

const setImgInputListener = () => {
  imgInput.addEventListener('change', onImgInputChange);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && isNotFormInput() && isPopupClosed()) {
    onCloseButtonClick();
  }
}

closeButton.addEventListener('click', onCloseButtonClick);


export { setImgInputListener };
