const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.handler = async function(event, context) {
  const url = context.queryStringParameters["url"]
  if (typeof url === 'undefined') { return false }

  (async () => {
	   try {
    	  const response = await got(url);
        const dom = new JSDOM(response.body);
        const nodeList = [...dom.window.document.querySelectorAll('meta')];
    	  console.log("response.body = " + response.body);
        console.log("nodeList = " + nodeList);
    		//=> '<!doctype html> ...'
    	} catch (error) {
    		console.log(error.response.body);
    		//=> 'Internal server error ...'
    	}
    })();
}
