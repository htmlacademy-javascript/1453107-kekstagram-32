const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const REGEX_HASHTAG = /^#[а-яёa-z0-9]{1,19}$/;

let pristine;

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


const validateHashtag = (value) => {

  const hashtags = value
    .toLowerCase()
    .replaceAll(' ', '')
    .replaceAll('#', '_#')
    .split('_')
    .filter((hashtag) => hashtag);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    errorMessage.hashtag = hashtagsErrorMessageTemplates.limitCount;
    return false;
  }

  let isValid = true;

  hashtags.forEach((hashtag) => {

    if (!REGEX_HASHTAG.test(hashtag)) {
      errorMessage.hashtag = hashtagsErrorMessageTemplates.spellingError;
      isValid = false;
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorMessage.hashtag = hashtagsErrorMessageTemplates.lengthLimit;
      isValid = false;
    }

    if (hashtags.filter((item) => item === hashtag).length > 1) {
      errorMessage.hashtag = hashtagsErrorMessageTemplates.duplicate;
      isValid = false;
    }
  });

  return isValid;
};

const validateDescription = (value) => value.length < MAX_DESCRIPTION_LENGTH;

const getHashtagsErrorText = () => errorMessage.hashtag;

const addValidators = (form, hashtagsInput, descriptionInput) => {

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

const validateForm = () => pristine.validate();

const clearValidator = () => {
  pristine.reset();
  pristine.destroy();
};


export { addValidators, validateForm, clearValidator };
