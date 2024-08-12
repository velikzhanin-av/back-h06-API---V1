import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {Request, Response} from "express";

export const app = express()
app.use(express.json())  // create body any requests
app.use(cors())  // allow any front make requests endpoints
app.use(cookieParser())  // allow middleware parse cookie

app.get('/', async (req: Request, res: Response) => {
    res.send({ version: '8.1' });
});
