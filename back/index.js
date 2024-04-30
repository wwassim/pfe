const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const AffectationRoute = require("./routes/AffectationRoute.js");
const { seedRoles } = require("./controllers/Roles.js");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection est ablished");
    seedRoles();
  })
  .catch((err) => {
    console.log(err);
  });
const db = mongoose.connection;

// Set up MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

// Use CORS middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);
// Use express.json middleware
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(AffectationRoute);

// Other middleware and routes...

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
