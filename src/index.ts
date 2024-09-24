import {SETTINGS} from "./settings";
import {app} from "./app";
import {blogsRouter} from "./routes/blogsRoutes";
import {postsRouter} from "./routes/postsRoutes";
import {connectToDB} from "./db/mongoDb";
import {usersRouter} from "./routes/usersRoutes";
import {authRouter} from "./routes/authRoutes";
import {testingRouter} from "./routes/testingRoutes";
import {commentsRouter} from "./routes/commentsRoutes";
import {securityRouter} from "./routes/securityRoutes";

const start = async () => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TESTING, testingRouter)
    app.use(SETTINGS.PATH.USERS, usersRouter)
    app.use(SETTINGS.PATH.AUTH, authRouter)
    app.use(SETTINGS.PATH.COMMENTS, commentsRouter)
    app.use(SETTINGS.PATH.SECURITY, securityRouter)

    if (!await connectToDB()) {
        console.log('stop')
        process.exit(1)
        return
    }

    app.listen(SETTINGS.PORT, () => {
        console.log(`Server started on port ${SETTINGS.PORT}`)
    })
}

start()



