import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {Request, Response} from "express";
import session from "express-session";
import {SETTINGS} from "./settings";
import {blogsRouter} from "./routes/blogsRoutes";
import {postsRouter} from "./routes/postsRoutes";
import {testingRouter} from "./routes/testingRoutes";
import {usersRouter} from "./routes/usersRoutes";
import {authRouter} from "./routes/authRoutes";
import {commentsRouter} from "./routes/commentsRoutes";
import {securityRouter} from "./routes/securityRoutes";


export const app = express()

app.use(express.json())  // create body any requests
app.use(cors())  // allow any front make requests endpoints
app.use(cookieParser())  // allow middleware parse cookie
app.set('trust proxy', true)

app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.USERS, usersRouter)
app.use(SETTINGS.PATH.AUTH, authRouter)
app.use(SETTINGS.PATH.COMMENTS, commentsRouter)
app.use(SETTINGS.PATH.SECURITY, securityRouter)

app.get('/', async (req: Request, res: Response) => {
    res.sendStatus(200)
})
