import { ValidationError } from "express-validator";

export class DatabaseConnectionError extends Error {
  constructor() {
    super();
    
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

