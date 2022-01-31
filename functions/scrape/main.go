package main

import (
	"context"
	"encoding/json"
	"github.com/PuerkitoBio/goquery"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"log"
	"net/http"
	"time"
)

type Metadata struct {
	Title, Image, Description, Favicon string
}

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	url := request.QueryStringParameters["url"]
	html := Fetch(url)
	meta := ParseMetaData(html)
	response := CreateResponse(meta)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       response,
	}, nil
}

func Fetch(url string) *goquery.Document {
	// Get HTML of target URL
	client := HttpClient()
	resp, respErr := client.Get(url)
	if respErr != nil {
		log.Fatal(respErr)
	}
	defer resp.Body.Close()

	// Load HTML document
	doc, docErr := goquery.NewDocumentFromReader(resp.Body)
	if docErr != nil {
		log.Fatal(docErr)
	}
	return doc
}

func ParseMetaData(doc *goquery.Document) *Metadata {
	// Scrape metadata elements
	title := doc.Find("title").First().Text()
	image, _ := doc.Find("meta[property=\"og:image\"]").First().Attr("content")
	description, _ := doc.Find("meta[name=\"description\"]").First().Attr("content")
	favicon, _ := doc.Find("link[rel=\"shortcut icon\"]").First().Attr("href")

	metadata := &Metadata{title, image, description, favicon}
	return metadata
}

func CreateResponse(metadata *Metadata) string {
	// Construct JSON string response
	response, err := json.Marshal(metadata)
	if err != nil {
		log.Fatal(err)
	}
	return string(response)
}

func HttpClient() *http.Client {
	client := &http.Client{
		Timeout: 30 * time.Second,
	}
	return client
}

func main() {
	// Make the Handler available
	lambda.Start(Handler)
}
