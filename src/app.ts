import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {Request, Response} from "express";
import session from "express-session";
import {SETTINGS} from "./settings";

// Расширяем интерфейс SessionData для хранения sessionId
declare module 'express-session' {
    interface SessionData {
        sessionId?: string;
    }
}

export const app = express()
app.use(express.json())  // create body any requests
app.use(cors())  // allow any front make requests endpoints
app.use(cookieParser())  // allow middleware parse cookie
// app.use(
//     session({
//         secret: SETTINGS.TOKEN_SECRET_KEY,  // Секретный ключ для подписи cookie
//         resave: false,              // Не сохранять сессию, если она не была изменена
//         saveUninitialized: false,   // Не сохранять "пустые" сессии
//         cookie: {
//             secure: false,            // Установите true, если используете HTTPS
//             maxAge: 24 * 60 * 60 * 1000, // Время жизни cookie (1 день)
//         },
//     })
// )

app.get('/', async (req: Request, res: Response) => {
    req.session.sessionId  = '123'
    console.log(req.session)
    res.sendStatus(200)
})
