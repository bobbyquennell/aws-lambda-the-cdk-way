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

## Tips

`@aws-cdk/*` packages should be consistent with their version number, otherwise you might encounter some warnings and errors

## constructs and constructors

the class constructors of both `LambdaWithApiGatewayStack` in `typescript/lambda-with-api-gateway/lib/lambda-with-api-gateway-stack.ts` and `NodejsFunction` (and many other classes in the CDK) have the signature (**scope**, **id**, **props**). This is because all of these classes are `constructs`. [Constructs](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html) are the basic building block of CDK apps. They represent abstract “cloud components” which can be composed together into higher level abstractions via `scopes`. Scopes can include constructs, which in turn can include other constructs, etc.

Constructs are always created in the scope of another construct and must always have an identifier which must be unique within the scope it’s created. Therefore, construct initializers (constructors) will always have the following signature:

1. `scope`: the first argument is always the scope in which this construct is created. In almost all cases, you’ll be defining constructs within the scope of current construct, which means you’ll usually just want to pass `this` for the first argument. Make a habit out of it.
2. `id`: the second argument is the **local identity** of the construct. It’s an ID that has to be **unique** amongst construct within the same scope. The CDK uses this identity to calculate the CloudFormation [Logical ID](https://docs.aws.amazon.com/cdk/latest/guide/identifiers.html#identifiers_logical_ids) for each resource defined within this scope.
3. `props`: the last (sometimes optional) argument is always a set of initialization properties. they are vary to different constructs, for example: [aws-lambda](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-readme.html)
