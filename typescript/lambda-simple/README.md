# Simple Lambda CDK example

This is a simple lambda project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

the lambda function is `/resources/simpleLambda.js`
it does nothing but return "Hello world" when triggered

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Before deploy to your environment first time

```script
cdk bootstrap --profile <your-aws-profile> AWS_ACCOUNT_NUMBER/AWS_REGION
```

## Deploy

```script
cdk deploy --profile <your-aws-profile>
```

## Destroy

```script
cdk destroy --profile <your-aws-profile>
```
