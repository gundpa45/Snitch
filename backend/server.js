import dotenv from 'dotenv';
import config from "./src/config/config.js"
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';

// Connect to Database``
connectDB();

const PORT = config.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running in ${config.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
