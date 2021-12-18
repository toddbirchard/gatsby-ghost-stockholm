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
    // scrapeUrlMetadata();
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
  let linkElement = document.getElementById('author-website')
  if (linkElement) {
    let url = linkElement.getAttribute('href')
    let client = new HttpClient()
    client.get(scrapeEndpoint + url, function (response) {
      let data = JSON.parse(response)
      linkElement.innerHTML = ('<div class="website-title">'
        + data['Title'] + '</div>'
        + '<div class="website-description">'
        + data['Description'] + '</div>' +
        '<img src="' + data['Image'] + '" alt="'
        + data['Title'] + '" class="website-image" />')
    })
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

/* function discordAPI() {
  let init = {
    method: 'GET',
    mode: 'cors',
    cache: 'reload'
  }
  fetch('https://discordapp.com/api/guilds/76381389393502208/widget.json', init).then(function (response) {
    if (response.status !== 200) {
      console.log("it didn't work" + response.status)
      return
    }
    response.json().then(function (data) {
      //var channels = data.channels;
      let users = data.members
      let serverName = data.name

      let liWrap = document.createElement('ul')
      liWrap.classList.add('channels--list--wrap')

      nameHeader.children[0].innerHTML = serverName

      function channelsFill() {
        for (let i = 0; i < data.channels.length; i++) {
          let li = document.createElement('li')
          li.classList.add('channel--name')
          li.innerText = data.channels[i].name
          liWrap.appendChild(li)
          channelBody.appendChild(liWrap)
        }
      }

      function usersFill() {
        for (let n = 0; n < data.members.length; n++) {

          let userWrap = document.createElement('div')
          let userName = document.createElement('span')
          let userImage = document.createElement('img')
          let userGame = document.createElement('span')
          let userStatus = document.createElement('div')
          let imageWrap = document.createElement('div')
          let botTag = document.createElement('div')
          userWrap.classList.add('user')

          userName.classList.add('username')
          userStatus.classList.add('user--status')
          imageWrap.classList.add('image--wrap')
          userGame.classList.add('user--game')
          botTag.classList.add('bot--tag')

          botTag.innerText = 'BOT'

          if (users[n].nick === undefined) {
            userName.innerText = users[n].username
          } else {
            userName.innerText = users[n].nick
          }

          if (users[n].status === 'online') {
            userStatus.classList.add('status--online')
          }
          if (users[n].status === 'idle') {
            userStatus.classList.add('status--idle')
          }
          if (users[n].status === 'dnd') {
            userStatus.classList.add('status--dnd')
          }

          if (users[n].bot === true) {
            userWrap.appendChild(botTag)
          }

          if (users[n].game !== undefined) {
            userGame.innerText = users[n].game.name
          }

          userWrap.appendChild(userGame)
          userImage.classList.add('user--image')
          userImage.setAttribute('src', data.members[n].avatar_url)

          imageWrap.appendChild(userStatus)
          imageWrap.appendChild(userImage)
          userWrap.appendChild(imageWrap)
          userWrap.appendChild(userName)

          userBody.appendChild(userWrap)
        }
      }

      channelsFill()
      usersFill()
    })
  })
    .catch(function (err) {
      console.log('fetch error: ' + err)
    })
}

discordAPI() */
