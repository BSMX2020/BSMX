import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class AppService {
  constructor(
  ) {}
}
