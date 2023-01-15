package main

import (
	"context"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
	BucketName string `json:"bucketName"`
	Key        string `json:"key"`
	Size       int64  `json:"size"`
	StatusCode int    `json:"statusCode"`
}

func s3Lambda(ctx context.Context, event events.S3Event) (Response, error) {
	response := Response{}
	for _, record := range event.Records {
		response.BucketName = record.S3.Bucket.Name
		response.Key = record.S3.Object.Key
		response.Size = record.S3.Object.Size
	}
	response.StatusCode = 200
	log.Println("response: ", response)
	return response, nil
}

func main() {
	lambda.Start(s3Lambda)
}
