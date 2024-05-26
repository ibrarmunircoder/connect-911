type ResponsePayloadType = {
  statusCode: number;
  body: string;
  headers?: Record<string, any>;
};

export const Response = {
  json: (options: ResponsePayloadType) => {
    return {
      statusCode: options.statusCode,
      body: options.body,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        ...(options.headers ? options.headers : {}),
      },
    };
  },
};
