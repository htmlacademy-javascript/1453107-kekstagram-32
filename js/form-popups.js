import { isEscapeKey, hasAllowedTagName } from './utils.js';

let popupMessage = null;
let isOpen = false;

const closePopupMessage = () => {
  document.body.removeChild(popupMessage);

  popupMessage.removeEventListener('click', onPopupMessageClick);
  document.removeEventListener('keydown', onDocumentKeydownPopups);

  popupMessage = null;
  isOpen = false;
};

const showPopupMessage = (template) => {
  isOpen = true;
  popupMessage = template.cloneNode(true);

  popupMessage.addEventListener('click', onPopupMessageClick);
  document.addEventListener('keydown', onDocumentKeydownPopups);

  document.body.append(popupMessage);
  document.body.classList.remove('modal-open');
};

const isPopupClosed = () => !isOpen;

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

export { showPopupMessage, isPopupClosed };
