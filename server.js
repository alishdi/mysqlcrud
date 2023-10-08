const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const { indexRoutes } = require("./routes/index.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'))

app.use(indexRoutes)

app.listen(3000,()=>{
    console.log('server run on port http://localhost:3000');
});
