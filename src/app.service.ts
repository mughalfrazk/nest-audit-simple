import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Console } from 'console';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log('Hello');
  }

  getHello(): string {
    return 'Audit Simple Nest.js Backend.';
  }
}
