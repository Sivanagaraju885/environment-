const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Schema
const reportSchema = new mongoose.Schema({
  wasteType: String,
  quantity: Number,
  city: String,
  state: String,
  district: String,
  location: String,
  date: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", reportSchema);

// Routes
app.post("/api/report", async (req, res) => {
  await new Report(req.body).save();
  res.json({ message: "Waste Reported Successfully" });
});

app.get("/api/reports", async (req, res) => {
  const data = await Report.find();
  res.json(data);
});

app.post("/api/contact", (req, res) => {
  res.json({ message: "Message Sent Successfully" });
});

// IMPORTANT: Dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
