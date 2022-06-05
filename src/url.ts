import {Md5} from 'ts-md5/dist/md5';

class Url {
  hash: string;
  original: string;
  isUrl: boolean;
  hashMaxLength: number = 6;

  constructor(body: string) {
    this.original = body;
    this.hash = Md5.hashStr(body).substring(0, this.hashMaxLength);
    this.isUrl = this.validate(body);
  }

  validate(body: string): boolean {
    return body.startsWith('http') || body.startsWith('https');
  }
}

export function createUrl(body: any) {
  return new Url(body);
}
