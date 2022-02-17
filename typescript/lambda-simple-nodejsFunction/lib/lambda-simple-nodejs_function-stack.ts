import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import { EventBus, Rule, CfnRule, RuleTargetInput, EventField } from 'aws-cdk-lib/aws-events';
import * as path from 'path';

export class LambdaSimpleNodejsFunctionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const customRole = new cdk.aws_iam.Role(this, 'Role', {
      roleName: 'eventBridgePublisherRole',
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com')
    });
    // define a lambda function with lambda.Function method, runs on AWS Graviton2 processors (ARM)
    const publisher = new NodejsFunction(this, 'simple-lambda-nodejsFunction',
      {
        functionName: 'simple-lambda-nodejsFunction',
        description: 'a simple lambda function defined and deployed with AWS cdk, using lambda-nodejs.NodejsFunction',
        runtime: lambda.Runtime.NODEJS_14_X,
        architecture: lambda.Architecture.ARM_64,
        entry: path.join(__dirname, '../services/simpleLambdaNodejs.ts'),
        role: customRole,
        handler: 'main',
        environment: {
          EVENT_BUS_NAME: `arn:aws:events:${this.region}:${this.account}:event-bus/test-event-bus`,
          AWS_REGION: this.region,
        }
      }
    );
    const bus = EventBus.fromEventBusArn(this, 'central-bus', `arn:aws:events:${this.region}:${this.account}:event-bus/test-event-bus`);
    bus.grantPutEventsTo(publisher);

  }
  
}

