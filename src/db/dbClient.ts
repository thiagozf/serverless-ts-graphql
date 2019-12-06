import { DynamoDB } from 'aws-sdk'

export const dbClient: DynamoDB.DocumentClient = process.env.IS_OFFLINE
  ? new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: `http://localhost:8000`,
      accessKeyId: 'DEFAULT_ACCESS_KEY',
      secretAccessKey: 'DEFAULT_SECRET',
    })
  : new DynamoDB.DocumentClient()
