import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

function streamToString(stream):string {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}

class Respository {
  client: S3Client;
  bucket: string;

  constructor() {
    this.client = new S3Client({region: process.env.CDK_DEFAULT_REGION});
    this.bucket = process.env.BUCKET_NAME || '';
  }

  async create(key: string, value: string): Promise<boolean> {
    const command = new PutObjectCommand({
      Key: key,
      Body: value,
      Bucket: this.bucket,
    });

    try {
      const result = await this.client.send(command);
      console.log(result);
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async get(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Key: key,
      Bucket: this.bucket,
    });

    try {
      const {Body} = await this.client.send(command);

      return await streamToString(Body);
    } catch (e) {
      console.error(e);
      return '';
    }
  }
}

export function createRepository() {
  return new Respository();
}

