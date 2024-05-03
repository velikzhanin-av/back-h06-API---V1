import {SETTINGS} from "./settings";
import {app} from "./app";
import {blogsRouter} from "./routes/blogs/routes";
import {testingRouter} from "./routes/testing/routes";
import {postsRouter} from "./routes/posts/routes";
import {connectToDB} from "./db/mongoDb";

const start = async () => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TESTING, testingRouter)

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



