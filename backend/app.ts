import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes



app.get("/favicon.ico", (req, res) => {
    // Serve a custom favicon or an empty response
    res.status(204).end(); // 204 No Content
  });
  
  app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
  });
  
  /* Errorhandler */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
  });
  
  export default app;