import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });

    return res.status(400).send({
      errors: formattedErrors,
    });
  } else if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({errors: [{message: 'internal error'}]})
  }

  res.status(400).send({
    message: "something went wrong",
  });
};
