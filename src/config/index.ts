import dotenv from "dotenv";
import path from "path";
import { env } from "process";

dotenv.config({path: path.join(process.cwd(), ".env")});

const config = {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    env: process.env.NODE_ENV,
}

export default config