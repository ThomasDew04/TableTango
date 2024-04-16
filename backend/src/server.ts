import app from "./app";
import dotenv from "dotenv";
import { connectToDatabase }  from './database';

const port = dotenv.config().parsed?.PORT;

connectToDatabase()
    .then((pool) => {

        // Store the database connection pool in application locals
        app.locals.db = pool;

        app.listen(port, () => {
          console.log(`🚀 Server is running at http://localhost:${port}`);
        });
    })
    .catch((error: any) => {
      console.error('❌ Error connecting to database:', error.message);
    });
