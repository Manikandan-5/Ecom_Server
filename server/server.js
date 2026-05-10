require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const errorHandler = require("./middleware/errorMiddleware");
const cors=require("cors")
const app = express();

connectDB();
app.use(cors())

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;