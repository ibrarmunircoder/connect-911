import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify('Hello World'),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify('Something went wrong'),
    };
  }
};
