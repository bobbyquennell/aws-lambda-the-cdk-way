import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { EventBus, Rule, CfnRule, RuleTargetInput, EventField, CfnEventBusPolicy, CfnEventBusPolicyProps } from 'aws-cdk-lib/aws-events';
import * as targets from "aws-cdk-lib/aws-events-targets";
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';
import { CfnParameter } from 'aws-cdk-lib';
export class LambdaEventBridgeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const publisher = new NodejsFunction(this, 'lambda-eventbridge-publisher',
      {
        functionName: 'lambda-eventbridge-publisher',
        description: 'a lambda function publishing events to eventbridge',
        runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
        architecture: Architecture.ARM_64,
        entry: path.join(__dirname, '../services/publisher.ts'),
        handler: 'main',
        environment: {
          EVENT_BUS_NAME: 'test-event-bus', // if only provide a name instead of ARN, it will be within the same account
        }
      }
    );

    //define the eventbridge event bus
    const bus = new EventBus(this, 'AuditEventBus', {
      eventBusName: `test-event-bus`
    });
    bus.grantPutEventsTo(publisher);
    // define the log group for debugging
    const logGroup = new cdk.aws_logs.LogGroup(this, 'LogGroup', { logGroupName: 'test-log-group', retention: cdk.aws_logs.RetentionDays.ONE_DAY});
    const eventRule = new Rule(this, 'EventRule', {
      ruleName: 'EventRule',
      description: 'forwarding all events to cloudwatch logs',
      eventBus: bus,
      eventPattern: {
        account:[this.account]
      }
    });
    eventRule.addTarget(new targets.CloudWatchLogGroup(logGroup));

    // define cross account policy for the event bus
    const publisherAccount = new CfnParameter(this, 'eventBusPublisherAccount', { type: 'String', description: 'the account of the EventBridge publisher' });
    const eventBusPolicyProps: CfnEventBusPolicyProps = {
      eventBusName: bus.eventBusName,
      statementId: 'AllowAcrossAccountsPutEvents',
      action: 'events:PutEvents',
      principal: publisherAccount.valueAsString,//TODO: fix this, should not be a root account
    };
    const eventBusPolicy = new CfnEventBusPolicy(this, 'EventBusPolicy', eventBusPolicyProps);
}}
