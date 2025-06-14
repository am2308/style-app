import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

// Bypass SSL certificate verification for AWS SDK (not recommended for production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Validate environment variables
const validateAWSConfig = () => {
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required AWS environment variables: ${missing.join(', ')}`);
  }
  
  console.log('AWS Configuration:');
  console.log('- Region:', process.env.AWS_REGION);
  console.log('- Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? `${process.env.AWS_ACCESS_KEY_ID.substring(0, 8)}...` : 'NOT SET');
  console.log('- Secret Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET');
};

// Validate configuration on startup
try {
  validateAWSConfig();
} catch (error) {
  console.error('AWS Configuration Error:', error.message);
  console.error('Please check your .env file and ensure all AWS credentials are properly set.');
  process.exit(1);
}

// AWS Credentials configuration
const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

// DynamoDB Configuration
const dynamoClient = new DynamoDBClient(awsConfig);
export const dynamoDB = DynamoDBDocumentClient.from(dynamoClient);

// S3 Configuration
export const s3Client = new S3Client({
  ...awsConfig,
  region: process.env.S3_REGION || process.env.AWS_REGION,
});

export const TABLES = {
  USERS: process.env.USERS_TABLE || 'StyleAI_Users',
  WARDROBE: process.env.WARDROBE_TABLE || 'StyleAI_Wardrobe',
};

export const S3_BUCKET = process.env.S3_BUCKET || 'styleai-wardrobe-images';

// Test AWS connection
export const testAWSConnection = async () => {
  try {
    console.log('Testing AWS connection...');
    
    // Test DynamoDB connection
    const { ListTablesCommand } = await import('@aws-sdk/client-dynamodb');
    await dynamoClient.send(new ListTablesCommand({}));
    console.log('✅ DynamoDB connection successful');
    
    // Test S3 connection
    const { ListBucketsCommand } = await import('@aws-sdk/client-s3');
    await s3Client.send(new ListBucketsCommand({}));
    console.log('✅ S3 connection successful');
    
    return true;
  } catch (error) {
    console.error('❌ AWS connection failed:', error.message);
    return false;
  }
};

export { dynamoClient };
