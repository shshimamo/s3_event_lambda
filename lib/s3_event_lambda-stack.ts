import * as cdk from 'aws-cdk-lib';
import * as eventsources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as go from '@aws-cdk/aws-lambda-go-alpha'
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3EventLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3
    const bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: 's3-event-lambda-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Lambda
    const lambda = new go.GoFunction(this, 'RdsProxyHandler', {
      entry: 'lambda',
      timeout: cdk.Duration.seconds(300)
    });

    lambda.addEventSource(new eventsources.S3EventSource(bucket, {
      events: [ s3.EventType.OBJECT_CREATED ],
      // filters: [ { prefix: 'subdir/' } ]
    }));
  }
}
