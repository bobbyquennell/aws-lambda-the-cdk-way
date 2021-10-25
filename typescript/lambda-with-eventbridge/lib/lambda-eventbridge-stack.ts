import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import { Architecture } from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class LambdaEventBridgeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const handler = new NodejsFunction(this, 'lambda-eventbridge',
      {
        functionName: 'lambda-eventbridge',
        description: 'an EventBridge rule invokes a simple lambda function',
        runtime: lambda.Runtime.NODEJS_14_X,
        architectures: [Architecture.ARM_64],
        entry: path.join(__dirname, '../services/simpleLambda.ts'),
        handler: 'main',
      }
    );
  }
}

