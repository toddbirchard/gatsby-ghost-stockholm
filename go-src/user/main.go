package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"time"
)

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	req := CreateRequest(request)
	userData := GetUserSession(req)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       userData,
	}, nil
}

func CreateRequest(request events.APIGatewayProxyRequest) *http.Request {
	endpoint, err := url.Parse("https://hackersandslackers.app/members/api/member/")
	var headers = http.Header{}
	headers.Set("cookie", string(request.Body))
	if err != nil {
		log.Fatal(err)
	}
	log.Println(endpoint)
	log.Println(headers)
	req := &http.Request{
		URL: endpoint,
		Header: headers,
		Method: "GET",
		Close: true,
	}
	return req
}

func GetUserSession(req *http.Request) string {
	// Request account information by session token.
	client := Client()
	res, reqError := client.Do(req)
	if reqError != nil {
		log.Fatal(reqError)
	}
	if res.StatusCode != 200 {
		log.Fatal("status code error: %i", res.StatusCode)
	}
	defer res.Body.Close()

	// Parse response
	data, bodyErr := ioutil.ReadAll(res.Body)
	log.Println(data)
	if bodyErr != nil {
		log.Fatal(bodyErr)
	}
	return string(data)
}

func Client() *http.Client {
	// Create HTTP client
	client := &http.Client{
		Timeout: 30 * time.Second,
	}
	return client
}

func main() {
	// Initialize Handler
	lambda.Start(Handler)
}
