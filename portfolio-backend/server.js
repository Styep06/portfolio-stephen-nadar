require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root route (for testing / Render)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection (ONLY ONCE)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// route
app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();

    res.json({ message: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving message" });
  }
});

// dynamic port (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});