import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { createAgentSchema } from '../../lib/validations';
import { Response } from '../../lib/send-response';

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'http-crud-tutorial-items';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    switch (event.requestContext.routeKey) {
      case 'POST /agents':
        const body = JSON.parse(event.body || `{}`);
        const { error } = createAgentSchema.valid(body);
        if (error) {
          return Response.json({
            statusCode: 400,
            body: JSON.stringify(error),
          });
        }

        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              ...body,
            },
          })
        );
        return Response.json({
          statusCode: 200,
          body: JSON.stringify('Hello World'),
        });
    }

    return Response.json({
      statusCode: 200,
      body: JSON.stringify('Hello World'),
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      statusCode: 500,
      body: JSON.stringify('Something went wrong'),
    });
  }
};
