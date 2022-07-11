import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import routes from './routes';

const app = express()

app.use(cors())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false}))

app.set("port", 3001)

app.use('/', routes)

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})