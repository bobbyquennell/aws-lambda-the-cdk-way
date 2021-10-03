import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Architecture } from '@aws-cdk/aws-lambda';

export class LambdaSimpleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define a lambda function with lambda.Function method, runs on AWS Graviton2 processors (ARM)
    const handler = new lambda.Function(this, 'simple-lambda', {
      functionName: 'simple-lambda',
      description: 'a simple lambda function defined and deployed with AWS cdk',
      runtime: lambda.Runtime.NODEJS_14_X,
      architectures: [Architecture.ARM_64],
      code: lambda.Code.fromAsset('resources'),
      handler: 'simpleLambda.main',

    } as lambda.FunctionProps);
  }
}
