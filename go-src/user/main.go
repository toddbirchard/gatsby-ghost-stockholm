package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	req, requestErr := CreateRequest(request)
	if requestErr != nil {
		log.Fatal(requestErr)
	}

	userData, dataErr := GetUserSession(req)
	if dataErr != nil {
		log.Fatal(dataErr)
	} else {
		log.Println(userData)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       userData,
	}, nil
}

func CreateRequest(request events.APIGatewayProxyRequest) (*http.Request, error) {
	endpoint := "https://hackersandslackers.app/members/api/member/"
	req, err := http.NewRequest("GET", endpoint, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("cookie", string(request.Body))
	log.Println(req.Header)
	return req, nil
}

func GetUserSession(req *http.Request) (string, error) {
	// Request account information by session token.
	client := Client()
	res, reqError := client.Do(req)
	if reqError != nil {
		log.Fatal(reqError)
	}

	// Parse response
	data, bodyErr := ioutil.ReadAll(res.Body)
	if bodyErr != nil {
		errResponse := fmt.Sprintf("{error: %s}", bodyErr)
		return errResponse, bodyErr
	}
	return string(data), nil
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
