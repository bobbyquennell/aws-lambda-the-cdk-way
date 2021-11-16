import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import {Architecture} from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

import * as path from 'path';
export class LambdaWithApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const handler = new NodejsFunction(this, 'lambda-with-api-gateway', {
      functionName: 'lambda-with-api-gateway',
      description: 'Lambda with API Gateway',
      runtime: lambda.Runtime.NODEJS_14_X,
      architecture: Architecture.ARM_64,
      entry: path.join(__dirname, '../src/lambda/hello.ts'),
      handler: 'handler'
    });

    // API Gateway: define a REST API backed by our "hello" function.
    const api = new apigateway.LambdaRestApi(this, 'api', {
      handler
    });
  }
}
