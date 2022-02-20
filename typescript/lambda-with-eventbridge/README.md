# Simple Lambda CDK example

This is a simple lambda project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

provision a `test-event-bus`(event publisher can be across account or within same account, if across account, when CDK deploy, you need to provide another aws account as the parameter `eventBusPublisherAccount`),

Note:
>When writing lambda with Typescript, you might consider a [lambda-nodejs.NodejsFunction](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda-nodejs.NodejsFunction.html), rather than [lambda.Function](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Function.html). 

>**lambda-nodejs.NodejsFunction** uses **esbuild** to bundle up the script and converts code written in TypeScript automatically.


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Before deploy to your environment first time

```script
export AWS_PROFILE=<your-aws-profile>
cdk bootstrap aws://<AWS_ACCOUNT_NUMBER>/<AWS_REGION> --profile <your-aws-profile>
```

## Deploy

```script
cdk deploy LambdaEventBridgeStack --profile <your-aws-profile> --parameters eventBusPublisherAccount=<another-aws-account>
```

## Destroy

```script
cdk destroy --profile <your-aws-profile>
```
