const downstreamHandler = async (event: any, context: any) => {
  console.log('downstreamHandler', event, context);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from downstreamHandler',
      input: event,
    }),
  };
}

export { downstreamHandler };
