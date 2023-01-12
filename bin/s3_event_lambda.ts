#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3EventLambdaStack } from '../lib/s3_event_lambda-stack';

const app = new cdk.App();
new S3EventLambdaStack(app, 'S3EventLambdaStack', {
});