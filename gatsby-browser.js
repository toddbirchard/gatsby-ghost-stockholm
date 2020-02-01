/* eslint-disable */
import Prism from 'prismjs';
import 'lazysizes';


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

export const onRouteUpdate = () => {
    trustAllScripts();
    Prism.plugins.NormalizeWhitespace.setDefaults({
    	'remove-trailing': true,
    	'remove-indent': true,
    	'left-trim': true,
    	'right-trim': true,
    });
    Prism.highlightAll();
}
