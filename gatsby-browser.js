/* eslint-disable */
import * as basicLightbox from 'basiclightbox'
import 'lazysizes'
import config from './src/utils/siteConfig'

// -------------------------------------------
// Events
// -------------------------------------------

// Trigger upon page load
export const onRouteUpdate = ({ location }) => {
  let path = location.pathname
  if ((path.split('/').length - 1) === 2) {
    enableLightboxImages()
  }
  if (path.indexOf('author')) {
    scrapeUrlMetadata();
  }

  if (
    process.env.NODE_ENV === `production` &&
    typeof window.plausible === `object`
  ) {
    const pathIsExcluded =
      location &&
      typeof window.plausibleExcludePaths !== `undefined` &&
      window.plausibleExcludePaths.some((rx) => rx.test(location.pathname));

    if (pathIsExcluded) return null;

    window.plausible('pageview');
  }
}

// -------------------------------------------
// Posts
// -------------------------------------------

// Lightbox functionality for post images
function enableLightboxImages() {
  let images = document.querySelectorAll('.kg-image-card img')
  if (images.length > 0) {
    for (let image in images) {
      if (image < images.length) {
        images[image].onclick = () => {
          let html = `<img src="` + images[image].getAttribute('src') + `" alt="` + images[image].getAttribute('alt') + `" />`
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
  let websiteWidget = document.getElementById('author-website-widget')
  let linkElement = document.getElementById('author-website')
  if (linkElement) {
    let endpoint = scrapeEndpoint + linkElement.getAttribute('href')
    let client = new XMLHttpRequest()
    client.open('GET',  endpoint, true)
    client.responseType = "json"
    client.setRequestHeader('Content-Type', 'application/json')
    client.setRequestHeader('Access-Control-Allow-Credentials', 'true')
    client.withCredentials = true
    client.onload = function () {
      let data = client.response
      console.log("response " + data)
      websiteWidget.innerHTML = ('<div class="website-title">'
        + data['Title'] + '</div>'
        + '<div class="website-description">'
        + data['Description'] + '</div>' +
        '<img src="' + data['Image'] + '" alt="'
        + data['Title'] + '" class="website-image" />')
    }
    client.send()
  }
}

// -------------------------------------------
// Members
// -------------------------------------------

// Determine if user is logged in
function getUserSession() {
  let client = new XMLHttpRequest()
  const sessionCookies = document.cookie
  if (sessionCookies) {
    client.open('POST', userEndpoint, true)
    client.setRequestHeader('Content-type', 'text/plain;charset=utf-8')
    client.onload = function () {
      if (this.responseText) {
        let data = JSON.parse(this.responseText)
      }
    }
    client.send(sessionCookies)
  }
}
