import { DynamoDB, Lambda } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event) => {
  console.log("request:", JSON.stringify(event, undefined, 2));
  
  const dynamo = new DynamoDB();
  const lambda = new Lambda();
  
  if(process.env.DOWNSTREAM_FUNCTION_NAME && process.env.HITCOUNTER_TABLE) {
    // update dynamoDB table entry for "path": hitcount++
    await dynamo.updateItem({
      TableName: process.env.HITCOUNTER_TABLE,
      Key: { path: { S: event.path } },
      UpdateExpression: "ADD hitcount :incr",
      ExpressionAttributeValues: { ":incr": { N: "1" } }
    }).promise();
    // call downstream function and capture response
    const resp = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event)
    }).promise();
    return JSON.parse(resp.Payload as string);
  }

  return {
    statusCode: 500,
    headers: { "Content-Type": "text/plain" },
    body: `Error: DOWNSTREAM_FUNCTION_NAME: ${process.env.DOWNSTREAM_FUNCTION_NAME} HITCOUNTER_TABLE: ${process.env.HITCOUNTER_TABLE}\n`
  };

};

export default handler;
