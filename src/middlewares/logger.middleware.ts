import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode } = res;

      Logger.log(`(${method}) - ${originalUrl} || ${statusCode}`);
    });

    next();
  }
}
