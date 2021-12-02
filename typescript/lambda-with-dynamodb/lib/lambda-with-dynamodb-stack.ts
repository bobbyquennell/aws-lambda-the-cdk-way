import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { HitCounter } from './hitcoutner';
import * as path from 'path';

export class LambdaWithDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const downstreamHandler = new NodejsFunction(this, 'DownstreamHandler', {
      functionName: 'downstreamHandler',
      description: 'Downstream Lambda Function',
      runtime: lambda.Runtime.NODEJS_14_X,
      architecture: lambda.Architecture.ARM_64,
      entry: path.join(__dirname, '../src/lambda/downstream-handler.ts'),
      handler: 'downstreamHandler',
    });
    const hitcounter = new HitCounter(this, 'HitCounter', {
      downstream: downstreamHandler
    });

    new apigateway.LambdaRestApi(this, 'Endpoint', {
      handler: hitcounter.handler
    });
  }
}
