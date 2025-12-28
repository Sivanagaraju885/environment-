const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/wastemgmt")
.then(() => console.log("MongoDB Connected"));

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

// Save report
app.post("/api/report", async (req, res) => {
  await new Report(req.body).save();
  res.json({ message: "Waste Reported Successfully" });
});

// Get reports
app.get("/api/reports", async (req, res) => {
  const data = await Report.find();
  res.json(data);
});

// Contact (simple)
app.post("/api/contact", (req, res) => {
  res.json({ message: "Message Sent Successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
