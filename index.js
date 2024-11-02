// app.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const multer = require("multer");

// parse form-data

const app = express();
const port = process.env.PORT || 3000;
app.use(multer().any());

async function setupDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/glozin");
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "My API", // API title
      version: "1.0.0", // API version
      description: "My API documentation", // API description
    },
    servers: [
      {
        url: "http://localhost:3000", // Update this to match your actual server URL
      },
    ],
  },
  apis: ["./routes/**/*.js", "./schemas/**/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import routes
const userRouter = require("./routes/user/userRoutes");
const adminRouter = require("./routes/admin/adminRoutes");

// Use routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// Default route
app.get("*", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Glozin APP" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function setupServer() {
  await setupDatabase();
}
setupServer();
