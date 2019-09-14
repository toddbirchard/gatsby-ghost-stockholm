/* eslint-disable */
import Prism from 'prismjs';

/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
var trustAllScripts = function() {
    var scriptNodes = document.querySelectorAll(
        '.load-external-scripts script'
    );

    for (var i = 0; i < scriptNodes.length; i += 1) {
        var node = scriptNodes[i];
        var s = document.createElement('script');
        s.type = node.type || 'text/javascript';

        if (node.attributes.src) {
            s.src = node.attributes.src.value;
        } else {
            s.innerHTML = node.innerHTML;
        }

        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

/*
 * NOTICE: ES6 module exports are not officially supported because of NodeJs
 * https://github.com/gatsbyjs/gatsby/pull/9239
 *
 * ES6 modules are here used because PrismJS should not work with CommonJs.
 */

var scrollableElements = function() {
    const slider = document.querySelector('pre');
    var isDown = false;
    var startX;
    var scrollLeft;
    if (slider){
      slider.addEventListener('mousedown', (e) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
          isDown = false;
          slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
          isDown = false;
          slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 3; //scroll-fast
          slider.scrollLeft = scrollLeft - walk;
          console.log(walk);
      });
    }
}

export const onRouteUpdate = () => {
    trustAllScripts();
    Prism.highlightAll();
    scrollableElements();
}

/*export const onInitialClientRender = () => {
    Prism.highlightAll();
}
*/
