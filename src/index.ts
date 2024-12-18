import 'reflect-metadata';
import {SETTINGS} from "./settings";
import {app} from "./app";
import {connectToDB} from "./db/mongoDb";
import {CommentsController} from "./controllers/commentsController";

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
