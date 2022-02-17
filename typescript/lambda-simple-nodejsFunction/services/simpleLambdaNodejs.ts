import { EventBridge } from "aws-sdk";

exports.main = async function(event: unknown, context: unknown) {
  console.log(event);
  const eventBusName = process.env.EVENT_BUS_NAME;
  const eventbridge = new EventBridge({ region: process.env.AWS_REGION || 'ap-southeast-2' });
  const eventBusRequestEntry: EventBridge.Types.PutEventsRequestEntry = { 
    EventBusName: eventBusName, 
    Source: "lambda-eventbridge-publisher", 
    DetailType: "lambda-eventbridge-publisher", 
    Detail: JSON.stringify(event) 
  };
  const eventBusRequest: EventBridge.PutEventsRequest = {
    Entries: [eventBusRequestEntry]
  };
  const result = await eventbridge.putEvents(eventBusRequest).promise();
  console.log(result);
  return 'Hello world';
}
