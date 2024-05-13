import 'dotenv/config';
import express,{Request,Response} from "express";
import cors from "cors";
import { json } from 'stream/consumers';
import "./database/connection";
import {router} from"./routes/userRouter";
import { authentification } from "./middleware/auth_middle";
const port=8080;
const app= express();
app.use(cors());
app.use(express.json());


app.use(authentification);

// all routes comes bellow
app.use("/users",router);
app.use("/notes", router);

app.listen(port,()=>{
    console.log("server is running at port: http://localhost:"+port);

});
