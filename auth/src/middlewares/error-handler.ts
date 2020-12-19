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
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else if (err instanceof DatabaseConnectionError) {
    return res
      .status(err.statusCode)
      .send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({
    message: "something went wrong",
  });
};
