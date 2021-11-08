# Simple Lambda CDK example

This is a simple lambda project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

the lambda function is `/services/simpleLambdaNodejs.ts`
it does nothing but return "Hello world" when triggered

## project structure

- `lib/lambda-simple-nodejs_function-stack.ts` is where your CDK application’s **main stack** is defined. This is the file we’ll be spending most of our time in.
- `bin/lambda-simple-nodejs_function.ts` is the **entrypoint** of the CDK application. It will load the stack defined in lib/cdk-workshop-stack.ts.

  <image style='max-width: 300px' alt='project structure' src='../../assets/images/project-structure.png'>

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
