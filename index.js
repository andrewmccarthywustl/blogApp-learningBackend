import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; // Import dirname and join from path module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
var titleArray = [];
var subTitleArray = [];
var contentArray = [];
var numItems = titleArray.length;

app.set("views", join(__dirname, "views")); // Use join instead of path.join
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Renders the index page
app.get("/", (req, res) => {
  res.render("index", {
    subTitleArray: subTitleArray,
    titleArray: titleArray,
    contentArray: contentArray,
    numItems: numItems,
  });
});

// Add post
app.post("/create-post", (req, res) => {
  const { title, subtitle, content } = req.body;
  titleArray.push(title);
  subTitleArray.push(subtitle);
  contentArray.push(content);
  numItems = titleArray.length;
  res.redirect("/");
});

// Sets up the port to always listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
