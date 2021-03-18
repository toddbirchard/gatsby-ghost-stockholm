import { fetch } from 'node-fetch'
import JSDOM from "jsdom"

// Client to create HTTP requests
export const urlPreview = ({ url }) => {
  if (typeof url === `undefined`) {
    return false
  }

  return fetch(url)
    .then(res => new JSDOM(res.body))
    .then(dom => [...dom.window.document.querySelectorAll(`meta`)])
    .catch(err => console.error(err))
}

/*
export async function urlPreview(event) {
  const url = event.queryStringParameters.url
  if (typeof url === `undefined`) {
    return false
  }

  (got(url).then((response) => {
    const dom = new JSDOM(response.body)
    const metaTags =
    return metaTags
  }).catch((err) => {
    console.log(err)
  })()
  )
}
*/
