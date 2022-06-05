import {
  APIGatewayProxyResult,
} from 'aws-lambda';

export class Response {
  constructor() {}

  static success(body: string = ''): Promise<APIGatewayProxyResult> {
    return Promise.resolve({body, statusCode: 200});
  }

  static failure(body: string = ''): Promise<APIGatewayProxyResult> {
    return Promise.resolve({body, statusCode: 500});
  }

  static missing(body: string= ''): Promise<APIGatewayProxyResult> {
    return Promise.resolve({body, statusCode: 404});
  }

  static redirect(loc: string, body:string = '')
    : Promise<APIGatewayProxyResult> {
    return Promise.resolve({
      body,
      headers: {
        Location: loc,
      }, statusCode: 302,
    });
  }
}
