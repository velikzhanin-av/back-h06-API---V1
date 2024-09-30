import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {Request, Response} from "express";
import session from "express-session";
import {SETTINGS} from "./settings";


export const app = express()
app.use(express.json())  // create body any requests
app.use(cors())  // allow any front make requests endpoints
app.use(cookieParser())  // allow middleware parse cookie
app.set('trust proxy', true)

app.get('/', async (req: Request, res: Response) => {
    res.sendStatus(200)
})
