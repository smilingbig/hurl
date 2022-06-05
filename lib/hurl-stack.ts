import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import {Construct} from 'constructs';
import {Stack, StackProps, RemovalPolicy} from 'aws-cdk-lib';

export class HurlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MyBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const shortUrlFn = new lambda.NodejsFunction(this, 'ShortUrlHandler', {
      entry: './src/shortUrlHandler.ts',
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    const longUrlFn = new lambda.NodejsFunction(this, 'LongUrlHandler', {
      entry: './src/longUrlHandler.ts',
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(shortUrlFn);
    bucket.grantReadWrite(longUrlFn);

    const api = new apigateway.RestApi(this, 'MyRestApi', {
      restApiName: 'MyRestApi',
    });

    api.root.addMethod(
        'POST',
        new apigateway.LambdaIntegration(shortUrlFn),
    );

    const url = api.root.addResource('{url}');
    url.addMethod(
        'GET',
        new apigateway.LambdaIntegration(longUrlFn),
    );
  }
}
