/* eslint-disable */
import * as basicLightbox from 'basiclightbox';
import 'lazysizes';
import config from './src/utils/siteConfig'


// -------------------------------------------
// Events
// -------------------------------------------

// Trigger upon page load
export const onRouteUpdate = ({location}) => {
  let path = location.pathname;
  if ((path.split('/').length - 1) === 2) {
    enableLightboxImages();
  }
  if (path.indexOf('author')) {
    // scrapeUrlMetadata();
  }
}

// -------------------------------------------
// Posts
// -------------------------------------------

// Lightbox functionality for post images
function enableLightboxImages() {
  let images = document.querySelectorAll('.kg-image-card img');
  if (images.length > 0) {
    for (let image in images) {
      if (image < images.length) {
        images[image].onclick = () => {
          let html = `<img src="` + images[image].getAttribute('src') + `" alt="` + images[image].getAttribute('alt') + `" />`;
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

// -------------------------------------------
// Authors
// -------------------------------------------
function scrapeUrlMetadata() {
  const scrapeEndpoint = config.lambda.scrape
  let linkElement = document.getElementById('author-website');
  if (linkElement) {
    let url = linkElement.getAttribute('href');
    let client = new HttpClient();
    client.get(scrapeEndpoint + url, function(response) {
      let data = JSON.parse(response)
      linkElement.innerHTML = ('<div class="website-title">'
        + data['Title'] + '</div>'
        + '<div class="website-description">'
        + data['Description'] + '</div>' +
        '<img src="' + data['Image'] + '" alt="'
        + data['Title'] + '" class="website-image" />')
    });
  }
}

// -------------------------------------------
// Members
// -------------------------------------------

// Determine if user is logged in
function getUserSession() {
  let client = new XMLHttpRequest();
  const sessionCookies = document.cookie;
  if (sessionCookies) {
    client.open('POST', userEndpoint, true);
    client.setRequestHeader('Content-type', 'text/plain;charset=utf-8');
    client.onload = function() {
      if (this.responseText) {
        let data = JSON.parse(this.responseText);
      }
    }
    client.send(sessionCookies);
  }
}
