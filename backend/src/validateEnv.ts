import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_SERVER: str(),
  DB_NAME: str(),
});
