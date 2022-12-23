require("dotenv").config({path: ".env"});


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

const defaultData = require("./db/defaultData");
const auth = require("./auth");
const books = require("./crud");
const db = require("./db");

const allowedHosts = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:80",
    "http://3.112.29.156",
    "http://3.112.29.156:80",
    "http://52.198.71.255",
    "http://52.198.71.255:80",
];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedHosts.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
db.defaults(defaultData).write();

app.use(express.json()); 

app.get("/me", auth.me);
app.post("/login", auth.login);
app.post("/signin", auth.signin);

app.get("/books", books.getAll);
app.get("/books/:id", books.getItem);
app.post("/books/create", books.createNew);
app.put("/books/update/:id", books.updateItem);
app.delete("/books/delete/:id", books.deleteItem);

console.log(`Running ${process.env.NODE_ENV} environment`);
app.listen(PORT, () => console.log(`API server listening at http://localhost:${PORT}`));