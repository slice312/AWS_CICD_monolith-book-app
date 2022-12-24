require("dotenv").config({path: ".env"});


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

const defaultData = require("./db/defaultData");
const auth = require("./auth");
const books = require("./crud");
const db = require("./db");


app.use(cors());

db.defaults(defaultData).write();

app.use(express.json());


const router = express.Router();
router.get("/me", auth.me);
router.post("/login", auth.login);
router.post("/signin", auth.signin);

router.get("/books", books.getAll);
router.get("/books/:id", books.getItem);
router.post("/books/create", books.createNew);
router.put("/books/update/:id", books.updateItem);
router.delete("/books/delete/:id", books.deleteItem);

app.use("/api", router);

console.log(`Running ${process.env.NODE_ENV} environment`);
app.listen(PORT, () => console.log(`API server listening at http://localhost:${PORT}`));