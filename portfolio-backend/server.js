const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@shopdb-project.qrwcugn.mongodb.net/?appName=shopDB-project")
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
    res.status(500).json({ message: "Error saving message" });
  }
});

// server start
app.listen(5000, () => console.log("Server running on port 5000"));