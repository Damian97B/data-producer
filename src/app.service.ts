import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getMainPage(): string {
    return `
      <h1>qwe</h1>
      <a href="/users">
        <button>asd</button>
      </a>
    `;
  }
}
