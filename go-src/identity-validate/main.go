package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/lambdacontext"
	"log"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	lc, ok := lambdacontext.FromContext(ctx)
	if !ok {
		return &events.APIGatewayProxyResponse{
			StatusCode: 503,
			Body:       "Something went wrong :(",
		}, nil
	}

	cc := lc.ClientContext

	log.Printf("New user created: %+v\n", cc)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, " + cc.Client.AppTitle,
	}, nil
}

func main() {
	lambda.Start(handler)
}
