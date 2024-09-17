const express = require("express");
const connectToDatabase = require("./db");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit as needed

const port = 3000;

app.use(express.json());

connectToDatabase();

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
