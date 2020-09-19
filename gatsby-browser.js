/* eslint-disable */
import * as basicLightbox from 'basiclightbox';
import 'lazysizes';
import config from './src/utils/siteConfig'


// Client to create HTTP requests
let HttpClient = function() {
  this.get = function(url, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send(null);
  }
}


// -------------------------------------------
// Events
// -------------------------------------------
// Trigger upon page load
export const onRouteUpdate = ({location}) => {
  let path = location.pathname;
  if ((path.split('/').length - 1) === 2) {
    codeSyntaxHighlight();
    enableLightboxImages();
  }
  if (path.indexOf('author')) {
    scrapeUrlMetadata();
  }
}

// -------------------------------------------
// Posts
// -------------------------------------------

// PrismaJS code snippet highlighting
function codeSyntaxHighlight() {
  Prism.plugins.customClass.prefix(`prism--`)
  Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    'indent': 2,
    'tabs-to-spaces': 4,
    'spaces-to-tabs': 4
  });
  Prism.highlightAll();
}

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
