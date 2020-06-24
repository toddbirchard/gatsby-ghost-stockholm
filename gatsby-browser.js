/* eslint-disable */
import Prism from 'prismjs';
import * as basicLightbox from 'basiclightbox';
import 'lazysizes';
import './src/styles/app.less';


/*
 * NOTICE: ES6 module exports are not officially supported because of NodeJs
 * https://github.com/gatsbyjs/gatsby/pull/9239
 *
 * ES6 modules are here used because PrismJS should not work with CommonJs.
 */
  Prism.plugins.NormalizeWhitespace.setDefaults({'remove-trailing': true, 'remove-indent': true, 'left-trim': true, 'right-trim': true});
  Prism.highlightAll();
  let path = location.pathname;
  if ((path.split('/').length - 1) === 2) {
    let images = document.querySelectorAll('.kg-image-card img');
    if (images.length > 0) {
      for (let image in images) {
        if (image < images.length) {
          images[image].onclick = () => {
            let html = `<img src="` + images[image].getAttribute('src') + `" />`;
            const instance = basicLightbox.create(html, {
              onShow: (instance) => {
          instance.element().style.opacity = 1
              },
              onClose: (instance) => {
                instance.element().style.opacity = 0
              }
            }).show()
          }
        }
      }
    }
  }
}
