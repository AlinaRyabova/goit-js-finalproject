import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector(`.gallery`);

const galleryMarkup = galleryItems
  .map(
    item => `<li class="gallery__item">
<a class="gallery__link" href="${item.original}">
  <img
    class="gallery__image"
    src="${item.preview}"
    data-source="${item.original}"
    alt="${item.description}"
  />
</a>
</li>`
  )
  .join(``);
gallery.innerHTML = galleryMarkup;

gallery.addEventListener(`click`, onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.classList.contains(`gallery__image`)) {
    const largeImage = event.target.dataset.source;

    const instance = basicLightbox.create(
      `
    <img width="1400" height="900" src="${largeImage}">
`,
      {
        onShow: instance => {
          window.addEventListener('keydown', onKeydownEsc);
        },
        onClose: instance => {
          window.removeEventListener('keydown', onKeydownEsc);
        },
      }
    );
    instance.show();
    window.instance = instance;
  }
}
function onKeydownEsc(event) {
  if (event.key === 'Escape') window.instance.close();
}
