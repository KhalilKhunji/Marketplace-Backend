const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: 'https://marketplace-frontend-ecru-seven.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DEL'],
  credentials: true,
};

app.use(cors(corsOptions));

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
app.use(morgan("dev"));
const database = require("./config/database");

// Importing user model
const User = require("./models/userModel");

// Importing item model
const Item = require("./models/itemModel");

// Importing profile model
const Profile = require("./models/profileModel");

// Authentication routes
const authenticationControllers = require("./controllers/authenticationControllers");
app.post("/signup", authenticationControllers.signup);
app.post("/signin", authenticationControllers.signin);

// JWT route protection middleware
const authenticateToken = require("./middleware/authenticateToken");
app.use(authenticateToken);

// Profile routes
const profileControllers = require("./controllers/profileControllers");
app.get("/user/:userId/profile", profileControllers.show);
app.put("/user/:userId/profile", profileControllers.update);

const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "us-east-1", // Replace with your preferred region
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "testingmarketplace",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// Item routes
const itemControllers = require("./controllers/itemControllers");
app.post("/user/:userId/item", upload.single("image"), itemControllers.create);
// list of all items
app.get("/user/:userId/item", itemControllers.index);
// Get a specific item
app.get("/user/:userId/item/:itemId", itemControllers.show);
app.put("/user/:userId/item/:itemId", upload.single("image"), itemControllers.update);
app.delete("/user/:userId/item/:itemId", itemControllers.deleteItem);

// Comment routes
const commentControllers = require("./controllers/commentControllers");
app.post(
  "/user/:userId/item/:itemId/comments", commentControllers.create);
app.put(
  "/user/:userId/item/:itemId/comments/:commentId",
  commentControllers.update
);
app.delete(
  "/user/:userId/item/:itemId/comments/:commentId",
  commentControllers.remove
);

// Contact form route
const contactControllers = require("./controllers/contactControllers");
app.post("/contact", contactControllers.create);

//history routes
const historyControllers = require("./controllers/historyControllers");
app.get("/user/:userId/profile/:profileId/history", historyControllers.show);

// Wishlist routes
const wishlistControllers = require("./controllers/wishlistControllers");
app.use("/profile", wishlistControllers);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
