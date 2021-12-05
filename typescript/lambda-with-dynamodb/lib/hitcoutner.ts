import * as cdk from 'aws-cdk-lib';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { Construct } from 'constructs';

export interface HitCounterProps {
  // the function for which we want to count invocations
  downstream: lambda.IFunction;
}

export class HitCounter extends Construct {
  public readonly handler: lambda.Function;
  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id);
    
    //define the lambda and the dynamoDB table
    const table = new dynamodb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });
  
    this.handler = new NodejsFunction(this, 'HitCounterHandler', {
      functionName: 'hitcounter-handler',
      entry: path.join(__dirname, '../src/lambda/hitcounter.ts'),
      handler: 'handler',
      architecture: lambda.Architecture.ARM_64,
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITCOUNTER_TABLE: table.tableName
      },
    });

    table.grantWriteData(this.handler);
    props.downstream.grantInvoke(this.handler);
  }
}
