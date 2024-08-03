const SCALE_STEP = 25;

const resizeImg = (button, input, img) => {
  const currentValue = Number.parseInt(input.value, 10);
  let newValue;

  if (button.classList.contains('scale__control--smaller')) {
    newValue = Math.max(currentValue - SCALE_STEP, SCALE_STEP);
  } else {
    newValue = Math.min(currentValue + SCALE_STEP, 100);
  }

  input.value = `${newValue}%`;
  img.style.transform = `scale(${newValue / 100})`;
};

const resetTransformStyle = (img) => {
  img.style.transform = 'none';
};


export { resetTransformStyle, resizeImg };
