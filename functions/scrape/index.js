const got = require('got');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

exports.handler = async function(event, context, callback) {
  const url = event["queryStringParameters"]["url"]
  if (typeof url === 'undefined') {
    return false
  }
  console.log("url = " + url)

  try {
    (async () => {
      const response = await got(url)
      const dom = new JSDOM(response.body)
      const nodeList = [...dom.window.document.querySelectorAll('meta')]
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: nodeList,
        })
      })
    })
  } catch (error) {
    console.log('error', error)
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      })
    })
  }
  })();
}
