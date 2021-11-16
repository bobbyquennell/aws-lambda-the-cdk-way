# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Lambda with DynamoDB

create a new  `construct` to define a "cloud component" called `HitCounter`.

* as mentioned earlier, **Constructs** are the basic building block of CDK apps. They represent abstract “cloud components” which can be composed together into higher level abstractions via scopes.

This `HitCounter` component acts as a middleware, it contains:

* a Lambda function that’s used as an API Gateway backend
  * the function will count how many requests were issued to each URL path, and store this in a DynamoDB table.
  * then it invoke the next function to actually serve the request.
* the DynamoDB table where keeping the request counts

  <image style='max-width: 240px' alt='project structure' src='../../assets/images/hit-counter.png'>
