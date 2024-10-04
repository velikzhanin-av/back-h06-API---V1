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



