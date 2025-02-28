const express = require("express");
const connectDB = require("./config");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Ensure these require statements are correct
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resume", require("./routes/resume"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
