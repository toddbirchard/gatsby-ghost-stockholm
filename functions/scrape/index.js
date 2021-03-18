const got = require('got');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

exports.handler = async function(event, context) {
  const url = event["queryStringParameters"]["url"]
  if (typeof url === 'undefined') {
    return false
  }
  console.log("url = " + url)

  (async () => {
    const response = await got(url)
    const dom = new JSDOM(response.body)
    const nodeList = [...dom.window.document.querySelectorAll('meta')]
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: nodeList
      })
    };
  })();
}
