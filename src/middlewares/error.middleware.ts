import { Request, Response, NextFunction } from "express";
import HttpException from "../errors/HttpException";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default errorMiddleware;
