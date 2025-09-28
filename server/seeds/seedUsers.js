require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const users = [];
  for (let i = 1; i <= 20; i++) {
    const email = `patient${i}@aurocare.com`;
    const exists = await User.findOne({ email });
    if (exists) continue;

    const passwordHash = await bcrypt.hash('demo123', 10);

    users.push({
      name: `Patient ${i}`,
      guardianName: `Guardian ${i}`,
      email,
      passwordHash,
      role: 'patient'
    });
  }

  if (users.length > 0) {
    await User.insertMany(users);
    console.log(`Inserted ${users.length} patients`);
  } else {
    console.log('No new users to insert');
  }

  process.exit(0);
}

seed().catch(err => console.error(err));
