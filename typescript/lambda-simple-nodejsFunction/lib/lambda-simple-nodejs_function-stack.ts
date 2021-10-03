import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import { Architecture } from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class LambdaSimpleNodejsFunctionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define a lambda function with lambda.Function method, runs on AWS Graviton2 processors (ARM)
    const handler = new NodejsFunction(this, 'simple-lambda-nodejsFunction',
      {
        functionName: 'simple-lambda-nodejsFunction',
        description: 'a simple lambda function defined and deployed with AWS cdk, using lambda-nodejs.NodejsFunction',
        runtime: lambda.Runtime.NODEJS_14_X,
        architectures: [Architecture.ARM_64],
        entry: path.join(__dirname, '../services/simpleLambdaNodejs.ts'),
        handler: 'main',
      }
    );
  }
}

