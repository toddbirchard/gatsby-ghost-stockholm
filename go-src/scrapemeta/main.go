package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"log"
	"net/http"
	"time"
)

type Metadata struct {
	Title       string
	Image       string
	Description string
	Favicon     string
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	params := request.QueryStringParameters
	url := params["url"]
	pageData := makePageRequest(url)
	metadataJsonResponse := getPageMetaData(pageData)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       metadataJsonResponse,
	}, nil
}

func makePageRequest(url string) *goquery.Document {
	// Create HTTP client with timeout
	client := &http.Client{
		Timeout: 30 * time.Second,
	}

	// Make request
	res, err := client.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatal("status code error: %d %s", res.StatusCode, res.Status)
	}

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	return doc
}

func getPageMetaData(doc *goquery.Document) string {
	// Find the review items
	title := doc.Find("title").First().Text()
	image, imgExists := doc.Find("meta[property=\"og:image\"]").First().Attr("content")
	description, descExists := doc.Find("meta name=\"description\"").First().Attr("content")
	favicon, iconExists := doc.Find("link rel=\"shortcut\"").First().Attr("href")

	// Log errors for missing meta items
	var errors []bool
	errors = append(errors, imgExists, descExists, iconExists)
	for i := range errors {
		if errors[i] == false {
			fmt.Printf("Index %d was false.\n", i)
		}
	}

	// Create metadata response
	metadata := &Metadata{
		Title: title,
		Image: image,
		Description: description,
		Favicon: favicon,
	}

	// Return response
	response, err := json.Marshal(metadata)
	if err != nil {
		log.Fatal(err)
	}
	return string(response)
}

func main() {
	// Make the handler available
	lambda.Start(handler)
}
