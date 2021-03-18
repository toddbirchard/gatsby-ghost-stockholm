const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.handler = async function(event, context) {
  const url = event["queryStringParameters"]["url"]
  if (typeof url === 'undefined') { return false }
  console.log("url = " + url)


  (async () => {
	   try {
    	  const response = await got(url);
        console.log("response.body = " + response.body)
        const dom = new JSDOM(response.body);
        console.log("dom = " + dom)
        const nodeList = [...dom.window.document.querySelectorAll('meta')];
    	  console.log("response.body = " + response.body);
        console.log("nodeList = " + nodeList);
        return {
          statusCode: 200,
          body: JSON.stringify({message: nodeList})
      };
    		//=> '<!doctype html> ...'
    	} catch (error) {
    		console.log(error.response.body);
    		//=> 'Internal server error ...'
    	}
    })();
}
