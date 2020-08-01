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

type SessionResponse struct {
	Data   string
	Errors []string
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
	// Construct HTTP request to fetch session data.
	endpoint := "https://hackersandslackers.app/members/api/member/"
	req, reqErr := http.NewRequest("GET", endpoint, nil)
	if reqErr != nil {
		return nil, reqErr
	}
	req.Header.Add("cookie", string(request.Body))
	return req, nil
}

func GetUserSession(req *http.Request) (string, error) {
	// Request user session information by token.
	client := HttpClient()
	sessionResponse, sessionError := client.Do(req)
	if sessionError != nil {
		log.Fatal(sessionError)
	}

	// Parse session response
	data, dataErr := ioutil.ReadAll(sessionResponse.Body)
	if dataErr != nil {
		return "", dataErr
	}
	return string(data), nil
}

func CreateResponse(data string, errors []string) string {
	// Construct JSON response of data & errors.
	responseData := &SessionResponse{
		Data:   data,
		Errors: errors,
	}
	response, resErr := json.Marshal(responseData)
	if resErr != nil {
		log.Fatal(resErr)
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
