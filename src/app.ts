import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";

export const app = express()
app.use(express.json())  // create body any requests
app.use(cors())  // allow any front make requests endpoints
app.use(cookieParser())  // allow middleware parse cookie
