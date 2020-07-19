package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

type UserResponse struct {
	Data      string
	Errors    []string
}

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var errors []string

	// Construct HTTP Request
	req, requestErr := CreateRequest(request)
	if requestErr != nil {
		errors = append(errors, fmt.Sprintf("Request error: %s", requestErr))
		log.Fatal(requestErr)
	}

	// Fetch session data
	sessionData, sessionErr := GetUserSession(req)
	if sessionErr != nil {
		errors = append(errors, fmt.Sprintf("Session error: %s", sessionErr))
		log.Fatal(sessionErr)
	}

	// Construct final response
	response := CreateResponse(sessionData, errors)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       response,
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
	client := HttpClient()
	sessionResponse, sessionError := client.Do(req)
	if sessionError != nil {
		log.Fatal(sessionError)
	}

	// Parse response
	data, dataErr := ioutil.ReadAll(sessionResponse.Body)
	if dataErr != nil {
		errResponse := fmt.Sprintf("{error: %s}", dataErr)
		return errResponse, dataErr
	}
	return string(data), nil
}

func CreateResponse(data string, errors []string) string {
	responseData := &UserResponse{
		Data:   data,
		Errors: errors,
	}
	response, err := json.Marshal(responseData)
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
	// Initialize Handler
	lambda.Start(Handler)
}
