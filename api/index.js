const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000 // 30 seconds
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
});

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});


