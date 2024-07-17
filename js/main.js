import { thumbnailsArray } from './data.js';
import { showThumbnails, galleryListener } from './thumbnails.js';
import { imgInputListener } from './form.js';

showThumbnails(thumbnailsArray);
galleryListener(thumbnailsArray);
imgInputListener();

