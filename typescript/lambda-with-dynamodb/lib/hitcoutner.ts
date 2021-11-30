import * as cdk from '@aws-cdk/core';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';

export interface HitCounterProps {
  // the function for which we want to count invocations
  downstream: lambda.IFunction;
}

export class HitCounter extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
    super(scope, id);
    // TODO: define the lambda and the dynamoDB table
  }
}
