const effectLevelBox = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelBox.querySelector('.effect-level__value');
const effectSlider = effectLevelBox.querySelector('.effect-level__slider');

let currentImgEffect = 'none';

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

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const setEffectSlider = (imgPreview) => {
  currentImgEffect = 'none';

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
};

const changeEffect = (evt) => {
  const effect = evt.target.value;

  const newOptions = effectsData[effect].effectsObj;
  currentImgEffect = effect;

  effectSlider.noUiSlider.updateOptions(newOptions);
};

export { setEffectSlider, changeEffect };
