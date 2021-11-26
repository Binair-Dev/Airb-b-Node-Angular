const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//BDD
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//Base Route
app.get("/", (req, res) => {
  res.send("Bienvenue sur ta magnifique API NodeJS");
});

//Routes
require("./app/routes/user.routes")(app);
require("./app/routes/property.routes")(app);
require("./app/routes/contract.routes")(app);
require("./app/routes/treasury.routes")(app);
require("./app/routes/login.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});