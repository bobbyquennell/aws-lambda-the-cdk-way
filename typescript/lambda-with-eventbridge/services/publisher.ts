import { EventBridge } from "aws-sdk";
exports.main = async function(event: unknown, context: unknown) {
  console.log(event);
  const eventBridge = new EventBridge({ region: process.env.AWS_REGION || 'ap-southeast-2' });
  const eventBusName = process.env.EVENT_BUS_NAME;
  const eventBusRequestEntry: EventBridge.Types.PutEventsRequestEntry = { 
    EventBusName: eventBusName, 
    Source: "publisher1", 
    DetailType: "publisher1", 
    Detail: JSON.stringify(event) 
  };
  const eventBusRequest: EventBridge.PutEventsRequest = {
    Entries: [eventBusRequestEntry]
  };
  const result = await eventBridge.putEvents(eventBusRequest).promise();
  console.log(result);
  return 'Hello world';
}
