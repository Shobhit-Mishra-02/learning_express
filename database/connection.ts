
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";


const client = new Client({
  host: "localhost",
  port: 5432,
  user: "golu02",
  password: "golu02",
  database: "api",
});
client.connect().then(()=>{
    console.log("database is connected")
});
export const db = drizzle(client);