package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	accountInfo := GetSessionInfo("https://hackersandslackers.app/members/api/member/")

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       accountInfo,
	}, nil
}

func GetSessionInfo(url string) string {
	// Create HTTP client with timeout
	client := &http.Client{
		Timeout: 30 * time.Second,
	}

	// Request account information by session token.
	res, resError := client.Get(url)
	if resError != nil {
		log.Fatal(resError)
	}
	if res.StatusCode != 200 {
		log.Fatal("status code error: %i", res.StatusCode)
	}
	defer res.Body.Close()

	// Parse response
	data, bodyErr := ioutil.ReadAll(res.Body)
	if bodyErr != nil {
		log.Fatal(bodyErr)
	}

	return string(data)
}

func main() {
	// Make the Handler available
	lambda.Start(Handler)
}
