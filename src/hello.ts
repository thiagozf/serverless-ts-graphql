import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const hello: APIGatewayProxyHandler = async (
  event,
  context,
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless Webpack (Typescript) v1.0! Your function executed successfully! ${context.awsRequestId}`,
      input: event,
    }),
  }
}
