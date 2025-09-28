require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Import User model
const authRoutes = require('./routes/auth');  // Import auth routes

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json());

// Async function to connect DB and insert test user
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected");

    // TEMPORARY TEST USER INSERT (ONLY RUN ONCE)
    const testUser = new User({
      name: 'Rithika',
      email: 'rithika@example.com',
      password: 'test123'
    });
    await testUser.save();
    console.log("✅ Test user saved to DB:", testUser);

    // Use auth routes
    app.use('/auth', authRoutes);

    // Start Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection or user insert error:", err.message);
  }
};

// Start everything
startServer();

