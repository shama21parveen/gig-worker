import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';

export function validate(schema: AnyZodObject) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const parsed = await schema.parseAsync({
      body: req.body ?? {},
      query: req.query ?? {},
      params: req.params ?? {},
    });

    req.body = parsed.body;
    req.query = parsed.query;
    req.params = parsed.params;

    next();
  };
}
