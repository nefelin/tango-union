import { Injectable, NestMiddleware } from '@nestjs/common';

export const logger  = (_, __, next) => {
  console.log('Request!');
  next();
};
