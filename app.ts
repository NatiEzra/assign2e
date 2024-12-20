const port=process.env.PORT;
import initApp from "./server.ts";

initApp.then((app) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at on port ${port}`);
});

const postsRoute = require("./routes/postRoutes");
app.use("/posts", postsRoute);

const commentsRoute = require("./routes/commentRoutes");
app.use("/comments", commentsRoute);

